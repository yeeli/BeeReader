const {ipcMain} = require('electron')
const _ = require('lodash')
const Model = require('../model')
const { Entry } = Model
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
  Entry.where({id: arg.id}).then( entries => {
    let entry = entries[0]
    if(_.isNil(entry.read_at)) {
      Entry.where({id: arg.id}).update({ read_at: Date.now()}).then(res => {
        if( res == 1 ) {
          Model.Stream.connection().where({id: entry.stream_id}).decrement('unread_count', 1).then(()=> {})
          Model.Account.connection().where({id: entry.account_id}).decrement('unread_count', 1).then(()=> {})

          event.sender.send(`/entries/readResponse?ktm=${ktm}`, {
            meta: {status: 'success'},
            data: { id: arg.id }
          })
        }
      })
    }
  })
})
