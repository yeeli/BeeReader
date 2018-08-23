const { Category } = require('../model')
const Sync = require('../sync')
const _ = require('lodash')

class CategoriesController {
  /*
   * /categories
   *
   * @desc Get all categories list with account
   *
   * @params account_id [Integer] Account id
   *
   */

  async index() {
    let { account } = this.request.params
    let categories = await Category.withStreams(account)
    if(_.isEmpty(categories)) {
      this.response.body = {
        meta: { status: 'failed' }, 
        data: { error_message: 'categories blank' }
      }
    } else {
      this.response.body = {
        meta: { status: 'success' }, 
        data: { categories: categories }
      }
    }
  }

  /*
   * /categories/create
   *
   * @desc Create new category 
   *
   * @params account_id [Integer] Account id
   * @params name [String] Category name
   *
   */

  async create() {
    let { account, title } = this.request.params
    let categories = await Category.where({account_id: account,  title: title})
    if(!_.isEmpty(categories)){
      this.response.body = {
        meta: { status: 'failed' },
        data: { error_message: 'category exists' }
      }
      return false
    }
    let category = await Sync.createCategory(account_id, title)
    category["stream_ids"] = ""
    this.response.body = {
      meta: { status: 'success' },
      data: { category: category }
    }
  }
}

module.exports = CategoriesController
