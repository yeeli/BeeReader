const {ipcMain} = require('electron')
const _ = require('lodash')
const { Folder } = require('../model')


/*
 * /folders
 *
 * @desc Get all streams list with account
 *
 * @params account_id [Integer] Account id
 *
 */

ipcMain.on('/folders', (event, arg, ktm) => {
  params = _.isNil(arg) ? {} : arg
  Folder.where(params).then(res => {
    event.sender.send(`/foldersResponse?ktm=${ktm}`, {
        meta: { status: 'success' }, 
        data: { folders: res }
      })
   })
})
