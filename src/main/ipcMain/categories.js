const {ipcMain} = require('electron')

const { Category } = require('../model')

ipcMain.on('/categories', (event, arg) => {
  Category.withStreams().then(res => {
    event.sender.send('/categoriesResponse', {
        meta: { status: 'success' }, 
        data: { categories: res }
      })
   })
})
