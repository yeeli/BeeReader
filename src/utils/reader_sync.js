import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

//import Category from '../models/category'
//import Subscription from '../models/subscription'
//import Account from '../models/Account'


export default class ReaderSync {
  static syncCategories() {
    axios.get("http://127.0.0.1:3001/categories").then(result => {
      result.data.forEach( category => {
        Category.create({oid: category.id, label: category.label})
      })
    })
  }
  static syncSubscriptions() {
    axios.get("http://127.0.0.1:3001/subscriptions").then(result => {
      result.data.forEach( item => {
        var categoriesIds = item.categories.map(result => result.id )
        var ids = []
        Category.collection.find({oid: {$in: categoriesIds}}).toArray().then(result => {
          return Promise.resolve(result.map(result => result._id))
        }).then( ids => {
           Subscription.create({oid: item.id, title: item.title, website: item.website, unreader_count: 0, starred_count: 0, items_count: 0, categories_ids: ids})
        })
      })
    })
  }
}

//ReaderSync.syncCategories()
//ReaderSync.syncSubscriptions()

