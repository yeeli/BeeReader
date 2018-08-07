const {ipcMain} = require('electron')
const { Category } = require('../model')
const Sync = require('../sync')
const _ = require('lodash')

/*
 * /categories
 *
 * @desc Get all categories list with account
 *
 * @params account_id [Integer] Account id
 *
 */

ipcMain.on('/categories', (event, arg, ktm) => {
  Category.withStreams().then(res => {
    event.sender.send(`/categoriesResponse?ktm=${ktm}`, {
      meta: { status: 'success' }, 
      data: { categories: res }
    })
  }).catch( e => {
    event.sender.send(`/categoriesResponse?ktm=${ktm}`, {
      meta: { status: 'failed' }, 
      data: { error_message: e }
    })
  }
  )
})

/*
 * /categories/create
 *
 * @desc Create new category 
 *
 * @params account_id [Integer] Account id
 * @params name [String] Category name
 *
 */

ipcMain.on('/categories/create', (event, arg, ktm) => {
  Sync.createCategory(arg.account_id, arg.title).then(res => {
    res["stream_ids"] = ""
    event.sender.send(`/categories/createResponse?ktm=${ktm}`, {
      meta: { status: 'success' },
      data: { category: res }
    })
  })
})

/*
 *
 * /categotirs/destory
 *
 * @desc Delete category with account
 *
 * @params account_id [Integer] Account id
 * @params id [Integer] Category id
 *
 */

ipcMain.on('/categories/destroy', (event, arg, ktm) => {

})
