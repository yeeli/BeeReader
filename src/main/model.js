const config = require('../config/database')
const database = config[process.env.NODE_ENV]
const knex = require('knex')(database)

class Account {
  static all() {
    knex.select().table("accounts")
  }
  static where(params) {
    knex("accounts").where(params)
  }
}

module.expert = {
  account: Account
}
