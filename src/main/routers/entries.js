const {ipcMain} = require('electron')
const _ = require('lodash')
const { Entry } = require('../model')
const Sync = require('../sync')

/*
 * /entries
 * 
 * @desc Get all entries in database
 *
 * @params stream_id [Integer] Stream id
 *
 */

ipcMain.on('/entries', (event, arg, ktm) => {
  let params = _.isNil(arg) ? {} : arg
  Entry.where({ "entries.account_id": arg.account }).select("entries.*", "streams.title as stream_title").join('streams', {'streams.id': 'entries.stream_id'}).orderBy('published_at', 'desc').then(res => {
    event.sender.send(`/entriesResponse?ktm=${ktm}`, {
        meta: { status: 'success' }, 
        data: { entries: res }
      })
   })
})

/*
 *
 * /entries/sync
 *
 * @desc Sync all entries
 *
 * @params stream_id [Integer] stream Id
 *
 */
 
ipcMain.on('/entries/sync', (event, arg, ktm) => {
  let params = _.isNil(arg) ? {} : arg
  Sync.syncStream(arg.stream).then(res => {
     event.sender.send(`/entries/syncResponse?ktm=${ktm}`, {
       meta: {status: 'success'},
       data: { entries: res }
     })
  }).catch(e => {
    console.log(e)
  })
})


/*
 * /entries/create
 *
 * @desc get all entries with current stream
 *
 * @params stream_id [Integer] stream id
 * 
 */

ipcMain.on('/entries/read', (event, arg, ktm) => {
  Entry.where({id: arg.id}).update({ read_at: Date.now()}).then(res => {
    if( res == 1 ) {
      event.sender.send(`/entries/readResponse?ktm=${ktm}`, {
         meta: {status: 'success'},
         data: { id: arg.id }
       })
    }
  })
})
