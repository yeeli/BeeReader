const { Category, Stream, Entry, Folder, Account, Data } = require('../model')
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

  async update() {
    let { id, title } = this.request.params
    let categories = this.request.params.categories || []
    let res = 1 
    if(!_.isNil(title)){
      res = await Stream.where({id: id}).update({title: title})
    }
    let folders = []
    if(res == 1){
      let streams = await Stream.where({id: id})
      let stream = streams[0]
      let sc = await Stream.withCategories(stream.id)
      let category_ids = sc.map((category) => { return category.category_id})
      categories = categories.map(category => {return parseInt(category)})
      // Update Folder list
      if(!_.isEmpty(categories)){
        await Folder.where({source_type: 'Stream', source_id: id}).update({state: 'inactive'})
      } else {
        let cfolders = await Folder.where({source_type: 'Stream', source_id: id})
        if(cfolders.length > 0) {
          await Folder.where({source_type: 'Stream', source_id: id}).update({state: 'active'})
        } else {
          folder = await Folder.create({source_type: 'Stream', source_id: id, account_id: stream.account_id, state: 'active'})
          folders.push(folder)
        }
      }
      let add_ids = _.difference(categories, category_ids)
      let delete_ids = _.difference(category_ids, categories)
      for(let cid of add_ids ) {
        Stream.createCategoryStreams(cid, stream.id)
        let category_folders = await Folder.where({source_type: 'Category', source_id: cid})
        if(category_folders.length < 1 ) {
          let folder = await Folder.create({ source_type: 'Category', source_id: cid, account_id: stream.account_id, state: 'active'})
          folders.push(folder)
        }
      }
      if(!_.isEmpty(delete_ids)){
        let a = Stream.deleteCategoryStreams(stream.id, delete_ids)
      }

      this.response.body = {
        meta: { status: 'success' },
        data: { 
          stream: stream,
          new_folders: folders,
          categories: categories
        }
      }
    } else {
      this.response.body = {
        meta: { status: 'failed' }
      }
    }
  }

  async makeAllRead() {
    const { type, id, account } = this.request.params
    let streams = []
    let entries = []
    switch(type) {
      case "all", "unread":
        //await Entry.where({account_id: account, read_at: null}).update({read_at: Date.now()})
        //await Stream.where({account_id: account}).update({unread_count: 0})
        break
      case "today":
        let date = new Date()
        let time = new Date(date.toDateString()).getTime()
        entries = await Entry.where(function(){
          this.where('account_id', account).andWhere('read_at', null).andWhere('published_at', '>=', time)
        })
        let stream_entries = _.groupBy(entries, 'stream_id')
        streams = _.keys(stream_entries)
        for(let s of streams) {
          let cEntries = await Entry.where(function(){
            this.where('read_at', null).andWhere('stream_id', s).andWhere('published_at', '>=', time)
          }).count()
          let entriesCount = cEntries[0]["count(*)"]
          //await Stream.where({id: s}).update({unread_count: entriesCount })
        }
        //await Entry.where(function(){
        //  this.where('account_id',account).andWhere('read_at', null).andWhere('published_at', '>=', time)
        //}).update({read_at: Date.now()})
        break
      case 'stream':
        streams = [id]
        //await Entry.where(function(){
        //  this.where('read_at', null).andWhere('stream_id', id)
        //}).update({read_at: Date.now()})
        //await Stream.where({id: id}).update({unread_count: 0})
        break
      case 'category':
        let categories = await Category.withStreams(account, id)
        let category = categories[0]
        streams = category.stream_ids.split(",")
        for(let s of streams) {
          var cEntries = await Entry.where(function(){
            this.where('read_at', null).andWhere('stream_id', s)
          }).count()
          var entriesCount = cEntries[0]["count(*)"]
          //await Stream.where({id: s}).update({unread_count: entriesCount })
        }
        //await Entry.where(function(){
        //  this.where('account_id',account).andWhere('read_at', null).whereIn('stream_id', streams)
        //}).update({read_at: Date.now()})
        break
      default:
        break
    }
    
    let unread = await Entry.where({account_id: account, read_at: null}).count()
    let unread_count = unread[0]["count(*)"]
    //await Account.where({id: account}).update({unread_count: unread_count})

    this.response.body = {
      meta: { status: 'success'},
      data: {
        unread_count: unread_count,
        streams: streams
      }
    }

  }
}

module.exports = StreamsController
