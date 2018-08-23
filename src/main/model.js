const config = require('./config/database')
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
  static withStreams(account) {
    try {
      return knex.schema.raw("select *, (select group_concat(stream_id) from categories_streams where category_id = categories.id ) as stream_ids from categories where categories.account_id = ?", account)
    } catch(e) {
      console.log(e)
    }
  }
}

class Stream extends Model {
  constructor() {
    super()
  }

  static withCategories(stream_id) {
    return knex.schema.raw("select category_id from categories_streams where stream_id = ?", stream_id)
  }

  static async deleteCategoryStreams(stream_id, category_ids) {
    return await knex("categories_streams").where({stream_id: stream_id}).whereIn('category_id', category_ids).del()
  }

  static async createCategoryStreams(category_id, stream_id) {
    let result = await knex("categories_streams").where({category_id: category_id, stream_id: stream_id})
    if(result.length == 0) {
      return await knex("categories_streams").insert({ category_id: category_id,  stream_id: stream_id})
    }
  }

}

class Entry extends Model {
  constructor() {
    super()
  }

  static async updateCount(entry_id) {

  }
}

class Data extends Model {
  constructor() {
    super()
  }
}

class Folder extends Model {
  constructor() {
    super()
  }
}

module.exports = {
  Account, 
  Category,
  Stream,
  Entry,
  Data,
  Folder
}
