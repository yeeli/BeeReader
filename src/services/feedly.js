const Service = require('./service')
const axios = require('axios')
const path = require('path')
const { Account, Category, Stream } = require('../main/model')
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
    var res = await axios.get('/v3/categories')
    const data = res.data
    data.forEach(async (item, index) => {
      const resData = await Category.where({oid: item.id, account_id: this.account.id})
      if(resData.length < 1 ){
        Category.create({ 
          oid: item.id, 
          account_id: this.account.id, 
          title: item.label,
          sort: index
        })
      }
    })
  }
  async fetchSubscriptions() {
    var res = await axios.get('/v3/subscriptions')
    const data = res.data
    data.forEach(async (item, index) => {
      const resData = await Stream.where({oid: item.id, account_id: this.account.id})
      if(resData.length < 1 ){
        /*         console.log(item.title)
          Stream.create({ 
          oid: item.id, 
          account_id: this.account.id, 
          title: item.title,
          keywords: item.topics
          }).then(async (res) => {
             cosole.log(res)
             item.categories.forEach( async (cate) => {
               const resData = await Category.where({oid: cate.id, account_id: this.account.id})
               console.log(resData)
             })
          }).catch(e => {console.log(e)})*/
      }
    })

  }
  getFeeds() {
  }
}


module.exports = Feedly
