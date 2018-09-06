import * as AppActions from '~/actions/app'
import * as StreamsActions from '~/actions/streams'
import  * as FoldersActions from '~/actions/folders'
import  * as AccountsActions from '~/actions/accounts'

export const REQUEST = "ENTRIES_REQUEST"
export const LOAD = "ENTRIES_LOAD"
export const ADD = "ENTRIES_ADD"
export const DELETE = "ENTRIES_DELETE"

export const FILTER = "ENTRIES_FILTER"

export const READ_REQUEST = "ENTRIES_READ_REQUEST"
export const READ = "ENTRIES_READ"
export const READ_ALL = "ENTRIES_READ_ALL"

export const load = (items) => ({
  type: LOAD,
  items: items
})

export const add = (items) => ({
  type: ADD,
  items: items
})

export const destroy = (id) => ({
  type: DELETE,
  id: id
})

export const read = (ids = []) => ({
  type: READ,
  ids: ids
})

export const readAll = (streams) => ({
  type: READ_ALL,
  streams: streams
})

export const filter = (account, type, entries, streams) => {
  let entriesList = []
  switch(type){
    case 'all':
      entriesList = _.filter(entries, (entry) => { return entry.account_id == account })
      break
    case 'unread':
      entriesList = _.filter(entries, (entry) => { return _.isNil(entry.read_at) && entry.account_id == account })
      break
    case 'today':
      entriesList = _.filter(entries, (entry) => { 
        let date = new Date()
        return entry.published_at > new Date(date.toDateString()).getTime() && _.isNil(entry.read_at) && entry.account_id == account
      })
      break
    default: 
      if(!_.isEmpty(streams)) {
        entriesList = _.filter(entries, (entry) => { 
          return _.includes(streams, _.toString(entry.stream_id)) 
        })
      }
  }
  return entriesList
}

export const fetchEntries = (account) => (dispatch, getState) => {
  const { currentAccount } = getState().App
  return dispatch({
    type: REQUEST, 
    sync: { 
      url: 'entriesPath',
      params: { account: account.id }
    }
  }).then(res => {
    dispatch(load(res.data.entries))
  })
}

export const filterEntries = () => (dispatch, getState) => {
  let { currentAccount } = getState().App
  let entries = getState().Entries.items
  let categories = getState().Categories.items
  let ids = []
  let selected = getState().App.selectedStream
  if(selected.type == 'stream') {
      ids = [_.toString(selected.id)]
    }
  if(selected.type == "category") {
    dispatch(AppActions.openFolder(selected.id))
    let category = _.find(categories, { id: selected.id})
    ids = category.stream_ids
  }
  let entriesList = filter(currentAccount.id, selected.type, entries, ids)
  return dispatch({
    type: FILTER,
    items:  entriesList
  })
}

export const syncEntries = (stream) => (dispatch, getState) => {
  let { currentAccount } = getState().App
  let streams = getState().Streams.items
  return dispatch({
    type: REQUEST,
    sync: {
      url: 'syncEntriesPath',
      params: {
        stream: stream
      }
    }
  }).then(res => {
    if(res.meta.status  === "success") {
    if(streams[streams.length - 1].id === stream){
      dispatch(AppActions.synced())
    }
    let count =  res.data.entries.length
    let date = new Date()
    let todayEntries = _.filter(res.data.entries, (entry) => {
       return entry.published_at > new Date(date.toDateString()).getTime() && _.isNil(entry.read_at)
    })
    let todayCount = todayEntries.length
    let cCount = currentAccount.entries_count + count
    let cUnreadCount = currentAccount.unread_count + count
    let cTodayCount = currentAccount.today_count + todayCount
    dispatch(StreamsActions.update(stream, count))
    dispatch(AccountsActions.updateCount("update", {count: cCount, unreadCount: cUnreadCount, todayCount: cTodayCount}))
    dispatch(add(res.data.entries))
    dispatch(filterEntries())
    }
  })
}

export const destroyEntries = (stream_id) => (dispatch, getState) => {
  dispatch(destroy(stream_id))
  dispatch(filterEntries())
}

export const readEntry = (id) => (dispatch, getState) => {
  let entries = getState().Entries.items
  let entry = _.find(entries, {id: id})
  if(!_.isNil(entry.read_at)){
    return false
  }
  return dispatch({
    type: READ_REQUEST,
    sync: {
      url: 'readEntriesPath',
      params: {
        id: id
      }
    }
  }).then(res => {
    dispatch(StreamsActions.read(entry.stream_id))
    dispatch(AccountsActions.updateCount("read", entry))
    dispatch(read([id]))
  })
}


