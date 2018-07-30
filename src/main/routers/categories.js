const {ipcMain} = require('electron')
const { Category } = require('../model')
const Sync = require('../sync')

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
   })
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
