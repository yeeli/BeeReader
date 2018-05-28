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
        }).then( rows => {
          this.account = rows[0]
          resolve(rows[0])
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
    data.forEach(async (item, index) => {
      console.log(`Category: ${item.label} synced.`)
      const resData = await Category.where({oid: item.id, account_id: this.account.id, state: 'active'})
      if(resData.length < 1 ){
        Category.create({ 
          oid: item.id, 
          account_id: this.account.id, 
          title: item.label,
          sort: index,
          state: 'active'
        })
      }
    })
  }
  async fetchSubscriptions() {
    console.log("fetched /v3/subscriptions")
    var res = await axios.get('/v3/subscriptions')
    const data = res.data
    data.forEach(async (item, index) => {
      console.log(`Subscription: ${item.title} synced.`)
      const resData = await Stream.where({oid: item.id, account_id: this.account.id, state: 'active'})
      if(resData.length < 1 ){
          Stream.create({ 
          oid: item.id, 
          account_id: this.account.id, 
          title: item.title,
          website: item.website,
          keywords: JSON.stringify(item.topics),
          state: 'active'
          }).then(async (res) => {
             item.categories.forEach( async (cate) => {
               const category = await Category.where({oid: cate.id, account_id: this.account.id, state: 'active'})
               console.log(`CategoryStreams: ${res[0].title} ${category[0].title} synced.`)
               await Stream.createCategoryStreams(category[0].id, res[0].id)
             })
        
          }).catch(e => {console.log(e)})
      }
    })

  }
  async fetchFeeds() {
    console.log("fetched /v3/streams/contents")
    Stream.where({oid: 'feed/http://www.36kr.com/feed', state: 'active'}).then( (stream) => {
      let streamId = stream[0].id
      let streamOid = stream[0].oid
      let params = {streamId: streamOid, count: 20, ranked: 'newest', ck: Date.now()}
      axios.get('/v3/streams/contents', {params: params}).then(res => {
          let resData = res.data
          resData.items.forEach( entry => {
            console.log(`entry: ${entry.title} synced...`)
            if (entry.content == undefined) {
              let content = entry.summary.content
              let summary = htmlToText.fromString(content, {ignoreImage: true, ignoreHref: true})
            } else {
              let content = entry.content.content
              let summary = htmlToText.fromString(entry.summary.content, {ignoreImage: true, ignoreHref: true})
            }
            Entry.create({
            oid: entry.id,
            stream_id: streamId,
            account_id: this.account.id, 
            title: resData.title,
            summary: summary,
            keywords: JSON.stringify(entry.keywords),
            cover:  JSON.stringify(entry.visual)
            }).then(resEntry => {
              Data.create({
                entry_id: resEntry[0].id,
                title: entry.title,
                content: content,
                author: entry.author,
                url: entry.originId
              })
            })
        })
      }).catch(error => { console.log(error)})
    })
  }
}


module.exports = Feedly
