const config = require('../config/database')
const database = config[process.env.NODE_ENV]
const knex = require('knex')(database)
const pluralize = require('pluralize')

class Model {
  constructor(attributes) {
    this.attributes = attributes
    this.tableName = this.constructor.name
  }
  static connection(fun) {
    return knex(this.tableName())
  }
  static tableName() {
    let pluralizeName = pluralize(this.name.toLowerCase())
    return pluralizeName == this.name.toLowerCase() ? `${pluralizeName}s` : pluralizeName
  }

  static all(){
    return this.connection().select()
  }
  static where(attributes) {
    return this.connection().where(attributes)
  }
  static create(attributes) {
    let self = this
    return new Promise((resolve, reject) => {
      self.connection().insert(attributes).then(id => { 
        self.connection().where({id: id[0]}).then( row => {
          resolve(row[0])
        })
      }) 
    })
  }
  static count() {
    let count = 0
    return new Promise( (resolve, reject) => {
      this.connection().count().then((row) => {
        count = row[0]["count(*)"]
        resolve(count)
      })
    })
  }
}

class Account extends Model {
  constructor() {
    super()
  }
}

class Category extends Model {
  constructor() {
    super()
  }
  static withStreams() {
    return knex.schema.raw("select *, (select group_concat(stream_id) from categories_streams where category_id = categories.id ) as stream_ids from categories")
  }
}

class Stream extends Model {
  constructor() {
    super()
  }

  static async createCategoryStreams(category_id, stream_id) {
    return await this.connection().insert({ category_id: category_id,  stream_id: stream_id})
  }
}

class Entry extends Model {
  constructor() {
    super()
  }
}

class Data extends Model {
  constructor() {
    super()
  }
}


module.exports = {
  Account, 
  Category,
  Stream,
  Entry,
  Data
}
