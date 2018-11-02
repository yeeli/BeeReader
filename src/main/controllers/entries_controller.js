const Model = require('../model')
const { Entry } = Model
const Sync = require('../sync')
const _ = require('lodash')

class EntriesController {
  async index() {
    let entries = await Entry.all().select("entries.*", "streams.title as stream_title").join('streams', {'streams.id': 'entries.stream_id'}).orderBy('published_at', 'desc')
    this.response.body = {
      meta: { status: 'success' }, 
      data: { entries: entries }
    }
  }

  async sync() {
    return Sync.syncStream(this.request.params.stream).then(res => {
      this.response.body = {
        meta: {status: 'success'},
        data: { entries: res }
      }
    }).catch(e => {
      this.response.body = {
        meta: { status: 'failed' },
        data: { error_message: e }
      }
    })
  }

  async read() {
    const { id } = this.request.params
    let entries = await Entry.where({ id: id })
    let entry = entries[0]
    if(!_.isNil(entry.read_at)){
      this.response.body = {
        meta: { status: 'failed' },
        data: { error_message: 'entry is read' }
      }
      return false
    } 
    let result = await Entry.where({id: id}).update({ read_at: Date.now()})
    if( result == 1 ) {
      await Model.Stream.connection().where({id: entry.stream_id}).decrement('unread_count', 1)
      await Model.Account.connection().where({id: entry.account_id}).decrement('unread_count', 1)
      this.response.body = {
        meta: {status: 'success'},
        data: { id: id }
      }
    }
  }
}

module.exports = EntriesController
