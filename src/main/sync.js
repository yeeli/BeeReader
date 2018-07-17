const Rss = require('../services/rss')
const Model = require('./model')
const _ = require('lodash')

//Create Stream


async function sync() {
  let stream = await Model.Stream.where({account_id: 1, oid: 'http://36kr.com/feed'})
  let rss = new Rss('http://36kr.com/feed')
  let feed = await rss.getFeed()
  if(_.isEmpty(stream)){
    stream = await Model.Stream.create({
      oid: 'http://36kr.com/feed',
      account_id: 1,
      title: feed.title,
      website: feed.link,
      state: 'active'
    })
  } 
  for(let item of feed.items){
    let entryData = await Model.Entry.where({ account_id: 1, oid: item.link, state: 'active'})
    if(_.isEmpty(entryData)){
      console.log(`create item ${item.title} `)
      let entryInfo = {
        oid: item.link, 
        stream_id: stream[0].id,
        account_id: 1,
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
sync()
