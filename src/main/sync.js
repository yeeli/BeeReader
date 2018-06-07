const Feedly = require('../services/feedly')
const Rss = require('../services/rss')

feedly = new Feedly()

const exitProcess = async() => {
  process.exit(0)
}

const test = async () => {
  const account = await feedly.getProfile()
  await feedly.fetchCategories()
  await feedly.fetchStreams()
  await feedly.fetchEntries()
  await exitProcess()
}

(async () => {
  let rss = new Rss()
  let entries = await rss.getEntries("http://www.ifanr.com/feed")
  //let entries = await rss.getEntries("http://36kr.com/feed")
  console.log(entries)
})()
