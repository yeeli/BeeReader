const config = require('../config/database')
const database = config[process.env.NODE_ENV]
const knex = require('knex')(database)
const pluralize = require('pluralize')

class Model {
  constructor(attributes) {
    this.attributes = attributes
    this.tableName = this.constructor.name
  }
  connection(fun) {
    return knex.schema.then(function(){
      return fun
    })
  }
  save() {
    return this.connection(knex.table(this.tableName).insert(this.attributes)) 
  }
  static tableName() {
    return pluralize(this.name.toLowerCase())
  }
  static all() {
    return this.prototype.connection(knex.select().from(this.tableName()))
  }
  static where(attributes) {
    return this.prototype.connection(knex(this.tableName()).where(attributes))
  }
  static create(attributes) {
    return this.prototype.connection(knex.table(this.tableName()).insert(attributes)).then(id => { return knex(this.tableName()).where({id: id[0]})})
  }
  static async count(attributes) {
    let count = 0
    await this.prototype.connection(knex.table(this.tableName()).where(attributes).count()).then( function(row){
      count = row[0]["count(*)"]
    })
    return  Promise.resolve(count)
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
}

class Stream extends Model {
  constructor() {
    super()
  }

  static createCategoryStreams(category_id, stream_id) {
    return this.prototype.connection(knex.table("categories_streams").insert({ category_id: category_id,  stream_id: stream_id}))
  }
}

module.exports = {
  Account, 
  Category,
  Stream
}
