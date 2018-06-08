const {ipcMain} = require('electron')
const { Category } = require('../model')

/*
 * /categories
 *
 * @desc Get all categories list with account
 *
 * @params account_id [Integer] Account id
 *
 */

ipcMain.on('/categories', (event, arg) => {
  Category.withStreams().then(res => {
    event.sender.send('/categoriesResponse', {
        meta: { status: 'success' }, 
        data: { categories: res }
      })
   })
})

ipcMain.on('/categories/sync', (event, arg) => {

})

ipcMain.on('/categories/create', (event, arg) => {
})
