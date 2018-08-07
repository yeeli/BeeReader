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

ipcMain.on('/streams', (event, arg, ktm) => {
  params = _.isNil(arg) ? {} : arg
  Stream.where(params).then(res => {
    event.sender.send(`/streamsResponse?ktm=${ktm}`, {
        meta: { status: 'success' }, 
        data: { streams: res }
      })
   })
})

/*
 * /streams/create
 *
 * @desc create Stream info with account
 *
 * @params account_id [Integer] Account id
 *
 */

ipcMain.on('/streams/create', (event, arg, ktm) => {
  Sync.createStream(arg.account, arg.url, arg.categories).then( res => {
    event.sender.send(`/streams/createResponse?ktm=${ktm}`, {
      meta: { status: 'success' },
      data: { 
        stream: res.stream,
        folders: res.folders
      }
    })
  }).catch(e => {
     event.sender.send(`/streams/createResponse?ktm=${ktm}`, {
      meta: { status: 'failed' },
      data: { error_message: e }
    })
  })
})

/*
 * /streams/destroy
 *
 * @desc Delete Stream with account
 *
 * @params account_id [Integer] Account id
 * @params id [Integer] Stream id
 *
 */

ipcMain.on('/streams/destroy', (event, arg, ktm) => {
  
})

ipcMain.on('/streams/rss', (event, arg, ktm) => {
  let rss = new Rss(arg.url)
  rss.getFeed().then(res => {
    event.sender.send(`/streams/rssResponse?ktm=${ktm}`, {
      meta: { status: 'success'},
      data: { rss: res }
    })
  }).catch(e => {
    console.log(e)
    event.sender.send(`/streams/rssResponse?ktm=${ktm}`, {
      meta: { status: 'failed'},
      data: { error_message: e }
    })

  })
})


