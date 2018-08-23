const { Stream, Entry, Folder, Account, Data } = require('../model')
const Rss = require('../services/rss')
const Sync = require('../sync')
const _ = require('lodash')

class StreamsController {
  /*
   * /streams
   *
   * @desc Get all streams list with account
   *
   * @params account_id [Integer] Account id
   *
   */
  async index() {
    let streams = await Stream.where({})
    this.response.body = {
      meta: { status: 'success' }, 
      data: { streams: streams }
    }
  }

  /*
   * /streams/create
   *
   * @desc create Stream info with account
   *
   * @params account [Integer] Account id
   *
   */


  async create() {
    let { account, url, categories} = this.request.params
    let streams = Stream.where({account_id: account, url: url})
    if(streams.length > 0) {
      this.response.body = {
        meta: { status: 'failed' },
        data: { error_message: "stream exists" }
      }
      return false
    }
    return Sync.createStream(account, url, categories).then(res => {
      this.response.body = {
        meta: { status: 'success' },
        data: { 
          stream: res.stream,
          folders: res.folders
        }
      }
    }).catch(e => {
      this.response.body = {
        meta: { status: 'failed' },
        data: { error_message: e }
      }
    })
  }

  /* 
   * /streams/destroy
   * 
   * @desc destroy streams
   *
   * @params id [Integer] Stream id
   *
   */

  async destroy() {
    let { id } = this.request.params
    let streams = await Stream.where({id: id})
    if(streams.length < 1) {
      this.response.body = {
        meta: { status: 'failed' },
        data: { error_message: "stream not exists" }
      }
      return false
    }
    let stream = streams[0]
    let entries = await Entry.where({stream_id: id})
    let entriesCount = entries.length
    let unreadEntries = _.filter(entries, (item) => { return _.isNil(item.read_at)})
    let unreadCount = unreadEntries.length
    let date = new Date()
    let todayEntries = _.filter(unreadEntries, (item) => { return item.published_at > new Date(date.toDateString()).getTime() })
    let todayCount = unreadEntries.length
    let entryIds = entries.map((entry) => { return entry.id })
    await Stream.where({ id: id }).del()
    await Folder.where({ source_type: 'Stream', source_id: id}).del()
    await Entry.where({stream_id: id}).del()
    await Data.connection().whereIn('entry_id', entryIds).del()
    await Account.where({id: stream.account_id}).decrement('unread_count', unreadCount)
    await Account.where({id: stream.account_id}).decrement('entries_count', entriesCount)
    this.response.body = {
      meta: { status: 'success' },
      data: { 
        entries_count: entriesCount,
        unread_count: unreadCount,
        today_count: todayCount
      }
    }
  }


  async rss() {
    let { url } = this.request.params
    let rss = new Rss(url)
    return rss.getFeed().then(res => {
      this.response.body = {
        meta: { status: 'success'},
        data: { rss: res }
      }
    }).catch(e => {
      this.response.body = {
        meta: { status: 'failed'},
        data: { error_message: e }
      }
    })
  }
}

module.exports = StreamsController
