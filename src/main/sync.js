const Rss = require('../services/rss')
const Model = require('./model')
const _ = require('lodash')


const createStream = async (account, uri, category) => {
  let stream = await Model.Stream.where({account_id: account, oid: uri})
  let rss = new Rss(uri)
  let feed = await rss.getFeed()
  let entries = []
  if(_.isEmpty(stream)){
    return Promise.reject('stream exist')
  } 
  let newStream = await Model.Stream.create({
    oid: uri,
    account_id: account,
    title: feed.title,
    website: feed.link,
    state: 'active'
  })
  return Promise.resolve(newStream)
}

const createCategory = async (account, name) => {
  let category = await Model.Category.where({account_id: account, oid: name})
  if(!_.isEmpty(category)){
    return Promise.reject('category exist')
  }
  let newCategory = await Model.Category.create({
    oid: name,
    account_id: account,
    title: name,
    state: 'active'
  })
  return Promise.resolve(newCategory)
}

const syncStream = async (id) => {
  let streams = await Model.Stream.where({id: id})
  let stream = streams[0]
  let accounts = await Model.Account.where({ id: stream.account_id })
  let account = accounts[0]
  let entries = []
  if(account.service == "Rss") {
    entries = await syncWithRss(stream)
  }
  return Promise.resolve(entries)
}

const syncWithRss = async (stream) => {
  let rss = new Rss(stream.oid)
  let feed = await rss.getFeed()
  let entries = []
  for(let item of feed.items) {
    let entryData = await Model.Entry.where({ account_id: stream.account_id, oid: item.link, state: 'active'})
    if(_.isEmpty(entryData)){
      let entryInfo = {
        oid: item.link, 
        stream_id: stream.id,
        account_id: stream.account_id,
        title: item.title,
        summary: item.summary,
        keywords: JSON.stringify(item.keywords),
        published_at:  item.published_at,
        state: 'active'
      }
      let entry = await Model.Entry.create(entryInfo)
      if (entry) {
        let dataInfo = {
          entry_id: entry.id,
          title: entry.title,
          content: item.content,
          author: item.author,
          url: item.link,
        }
        await Model.Data.create(dataInfo)
      }
      entries.push(entry)
    }
  }
  return Promise.resolve(entries)
}


module.exports = {
  syncStream, 
  createStream,
  createCategory
}
