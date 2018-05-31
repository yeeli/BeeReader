const {ipcMain} = require('electron')

const { Category } = require('../model')

ipcMain.on('/categories', (event, arg) => {
  Category.all(arg).then(res => {
    event.sender.send('/categoriesResponse', {
        meta: { status: 'success' }, 
        data: { categories: res }
      })
   })
})
