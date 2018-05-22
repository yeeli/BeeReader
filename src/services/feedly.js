const Service = require('./service')
const axios = require('axios')
const path = require('path')
require('dotenv').config()


class Feedly extends Service {
  constructor(){
    super()
    //this.apiUri = "http://cloud.feedly.com"
    //this.token = process.env.FEEDLY_TOKEN 
    //axios.defaults.baseURL = this.apiUri
    //axios.defaults.headers.common['Authorization'] = `OAuth ${this.token}`
  }
  async getProfile() {
    const res = await axios.get('/v3/profile')
    console.log(res.data)
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

/*
feedly = new Feedly()
feedly.getSubscriptions()
knex('accounts').where('id', 1)
  .then(function(res) {
    console.log(res)
    process.exit(0);
  })
*/
