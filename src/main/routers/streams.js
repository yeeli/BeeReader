const {ipcMain} = require('electron')
const _ = require('lodash')
const { Stream } = require('../model')
const Rss = require('../../services/rss')
const Sync = require('../sync')

/*
 * /streams
 *
 * @desc Get all streams list with account
 *
 * @params account_id [Integer] Account id
 *
 */

ipcMain.on('/streams', (event, arg) => {
  if(_.isNil(arg)){
    params = {}
  } else {
    params = arg
  }
  Stream.where(params).then(res => {
    event.sender.send('/streamsResponse', {
        meta: { status: 'success' }, 
        data: { streams: res }
      })
   })
})

/*
 * /streams/create
 *
 * @desc Sync all Stream with account
 *
 * @params account_id [Integer] Account id
 *
 */

ipcMain.on('/streams/create', (event, arg) => {

})

ipcMain.on('/streams/destroy', (event, arg) => {
})

ipcMain.on('/streams/rss', (event, arg) => {
  let rss = new Rss(arg.url)
  rss.getFeed().then(res => {
    event.sender.send('/streams/rssResponse', {
      meta: { status: 'success'},
      data: { rss: res }
    })
  })
})

ipcMain.on('/streams/sync', (event, arg) => {
   Sync.withStream(arg.id) 
})
