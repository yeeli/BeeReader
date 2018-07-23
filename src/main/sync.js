const Rss = require('../services/rss')
const Model = require('./model')
const _ = require('lodash')

const syncStream = async (id) => {
  let streams = await Model.Stream.where({id: id})
  let stream = streams[0]
  let accounts = await Model.Account.where({ id: stream.account_id })
  let account = accounts[0]
  if(account.service == "Rss") {
    syncWithRss(stream)
  }
}

const syncWithRss = async (stream) => {
  let rss = new Rss(stream.oid)
  let feed = await rss.getFeed()
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
    }
  }
}


module.exports = {withStream: syncStream}
