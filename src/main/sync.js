const Feedly = require('../services/feedly')
const Rss = require('../services/rss')
const Model = require('./model')

const syncAccount = async () => {
  let account = await Model.Account.connection().where({service: 'Rss'}).first()
  console.log(account)
}

syncAccount()
