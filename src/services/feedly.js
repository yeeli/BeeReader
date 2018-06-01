const Service = require('./service')
const axios = require('axios')
const path = require('path')
const htmlToText = require('html-to-text')
const { Account, Category, Stream, Entry, Data } = require('../main/model')
require('dotenv').config()


class Feedly extends Service {
  constructor(){
    super()
    this.apiUri = "http://cloud.feedly.com"
    this.token = process.env.FEEDLY_TOKEN 
    let account
    axios.defaults.baseURL = this.apiUri
    axios.defaults.headers.common['Authorization'] = `OAuth ${this.token}`
  }
  async getProfile() {
    console.log("fetched /v3/profile")
    const res = await axios.get('/v3/profile')
    const data = res.data
    const resData = await Account.where({oid: data.id})
    return new Promise((resolve, reject) => {
      if( resData.length < 1 ) {
        Account.create({
          oid: data.id,
          username: data.login,
          service: 'Feedly'
        }).then( row => {
          resolve(row)
        }).catch( e => { console.log(e)})
      } else {
        this.account = resData[0]
        resolve(resData[0])
      }
    })
  }
  async fetchCategories() {
    console.log("fetched /v3/categories")
    var res = await axios.get('/v3/categories')
    const data = res.data
    for(let [index, item] of data.entries()) {
      const resData = await Category.where({
        oid: item.id, 
        account_id: this.account.id, 
        state: 'active'
      })
      if(resData.length < 1 ){
        await Category.create({ 
          oid: item.id, 
          account_id: this.account.id, 
          title: item.label,
          sort: index,
          state: 'active'
        })
      }
    }
  }
  async fetchStreams() {
    console.log("fetched /v3/subscriptions")
    var res = await axios.get('/v3/subscriptions')
    const data = res.data
    for (let item of data) {
      const resData = await Stream.where({oid: item.id, account_id: this.account.id, state: 'active'})
      if(resData.length < 1 ){
        console.log(`Subscription: ${item.title} synced.`)
        let stream = Stream.create({ 
          oid: item.id, 
          account_id: this.account.id, 
          title: item.title,
          website: item.website,
          keywords: JSON.stringify(item.topics),
          state: 'active'
        })
        for(let cate of item.categories) {
          const category = await Category.where({oid: cate.id, account_id: this.account.id, state: 'active'})
          console.log(`CategoryStreams: ${res.title} ${category[0].title} synced.`)
          await Stream.createCategoryStreams(category[0].id, res.id)
        }
      }
    }

  }
  async fetchEntries() {
    console.log("fetched /v3/streams/contents")
    let streams = await Stream.where({account_id: this.account.id, state: 'active'})
    for (let stream of streams) {
      let streamId = stream.id
      let streamOid = stream.oid
      let params = {streamId: streamOid, count: 20, ranked: 'newest', ck: Date.now()}
      let res = await axios.get('/v3/streams/contents', {params: params})
      let resData = res.data
      for(let entry of resData.items){
        const entryData = await Entry.where({oid: entry.id, account_id: this.account.id})
        if (entryData.length > 0) {
          continue 
        }
        console.log(`entry: ${entry.title} synced...`)
        let summary = ""
        let content = ""
        if (entry.content == undefined) {
          content = entry.summary.content
          summary = htmlToText.fromString(content, {ignoreImage: true, ignoreHref: true})
        } else {
          content = entry.content.content
          summary = htmlToText.fromString(entry.summary.content, {ignoreImage: true, ignoreHref: true})
        }
        let resEntry = await Entry.create({
          oid: entry.id,
          stream_id: streamId,
          account_id: this.account.id, 
          title: entry.title,
          summary: summary,
          keywords: JSON.stringify(entry.keywords),
          cover:  JSON.stringify(entry.visual),
          published_at: new Date(parseInt(entry.published))
        })
        if(resEntry) {
          await Data.create({
            entry_id: resEntry.id,
            title: entry.title,
            content: content,
            author: entry.author,
            url: entry.originId
          })
        }
      }
    }
  }
}


module.exports = Feedly
