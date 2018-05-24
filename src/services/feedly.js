const Service = require('./service')
const axios = require('axios')
const path = require('path')
const { Account } = require('../main/model')
require('dotenv').config()


class Feedly extends Service {
  constructor(){
    super()
    this.apiUri = "http://cloud.feedly.com"
    this.token = process.env.FEEDLY_TOKEN 
    axios.defaults.baseURL = this.apiUri
    axios.defaults.headers.common['Authorization'] = `OAuth ${this.token}`
  }
  async getProfile() {
    const res = await axios.get('/v3/profile')
    const data = res.data
    Account.count({oid: data.id}).then(count =>{ 
      if( count < 1 ) {
        Account.create({
          oid: data.id,
          username: data.login,
          service: 'Feedly'
        })
      }
    })
  }
  async getCategories() {
    var res = await axios.get('/v3/categories')
    console.log(res.data)
  }
  async getSubscriptions() {
    var res = await axios.get('/v3/subscriptions')
    console.log(res.data)
  }
  getFeeds() {
  }
}


module.exports = Feedly
