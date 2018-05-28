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
    let pulName = pluralize(this.name.toLowerCase())
    if(pulName == this.name.toLowerCase()) {
      return `${pulName}s`
    } else {
      return pulName
    }
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

  static async createCategoryStreams(category_id, stream_id) {
    return await this.prototype.connection(knex.table("categories_streams").insert({ category_id: category_id,  stream_id: stream_id}))
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
