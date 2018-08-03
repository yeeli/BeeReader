const Rss = require('../services/rss')
const Model = require('./model')
const _ = require('lodash')
const url = require('url')


const createStream = async (account, uri, categories = []) => {
  let streams = await Model.Stream.where({account_id: account, oid: uri})
  let rss = new Rss(uri)
  let feed = await rss.getFeed()
  let entries = []

  if( streams.length > 0 ){
    return Promise.reject('stream exist')
  } 

  let stream = await Model.Stream.create({
    oid: uri,
    account_id: account,
    title: feed.title,
    website: feed.link,
    state: 'active'
  })

  if(categories.length > 0) {
    for( let category of categories) {
      Model.Stream.createCategoryStreams(category, stream.id)
      let folders = await Model.Folder.where({account_id: account, source_type: 'Category', source_id: category, state: 'active'})
      if(folders.length <= 0 ) {
        Model.Folder.create({
          account_id: account,
          source_type: 'Category',
          source_id: category,
          state: 'active'
        })
      }
    }
  } else {
    Model.Folder.create({
      account_id: account,
      source_type: 'Stream',
      source_id: stream.id,
      state: 'active'
    })
  }
  return Promise.resolve(stream)
}

const createCategory = async (account, name) => {
  let categories = await Model.Category.where({account_id: account, oid: name})
  if( categories.length > 0 ){
    return Promise.reject('category exist')
  }
  let category = await Model.Category.create({
    oid: name,
    account_id: account,
    title: name,
    state: 'active'
  })
  return Promise.resolve(category)
}

const syncStream = async (id) => {
  let streams = await Model.Stream.where({id: id})
  let stream = streams[0]
  let accounts = await Model.Account.where({ id: stream.account_id })
  let account = accounts[0]
  let entries = []
  if(account.service == "Rss") {
    entries = await syncWithRss(streams)
  }
  if(entries.length > 0) {
    Model.Stream.connection().where({id: stream.id}).increment('entries_count', entries.length)
    Model.Stream.connection().where({id: stream.id}).increment('unread_count', entries.length)
  }
  return Promise.resolve(entries)
}

const syncWithRss = async (streams) => {
  let stream = streams[0]
  let rss = new Rss(stream.oid)
  let feed = await rss.getFeed()
  let entries = []
  for(let item of feed.items) {
    itemLink = url.parse(item.link)
    link = itemLink.href
    let entryData = await Model.Entry.where({ account_id: stream.account_id, oid: link, state: 'active'})
    if(_.isEmpty(entryData)){
      let entryInfo = {
        oid: link,
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
          url: link,
        }
        await Model.Data.create(dataInfo)
      }
      entry['stream_title'] = stream.title
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
