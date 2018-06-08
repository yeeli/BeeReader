const Feedly = require('../services/feedly')
const Rss = require('../services/rss')
const Model = require('./model')

const createStream = async (account_id, category_id) => {
  let stream = await Model.Stream.connection().where({})
}

const syncAccount = async () => {
  let account = await Model.Account.connection().where({service: 'Rss'}).first()
}

syncAccount()
