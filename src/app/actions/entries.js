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

export const read = (id) => ({
  type: READ,
  id: id
})


export const fetchEntries = () => (dispatch, state) => {
  return dispatch({
    type: REQUEST, 
    sync: { 
      url: 'entriesPath'
    }
  }).then(res => {
    dispatch(load(res.data.entries))
  })
}

export const filter = () => (dispatch, getState) => {
  let account = getState().App.currentAccount
  let entries = getState().Entries.items
  let categories = getState().Categories.items
  let ids = []
  let selected = getState().App.selectedStream
  if(selected.type == 'stream') {
      ids = [selected.id]
    }
  if(selected.type == "category") {
    dispatch(AppActions.openFolder(selected.id))
    let category = _.find(categories, { id: selected.id})
    let idsStr = category.stream_ids || ""
    ids = idsStr.split(",").map( (id) => { return parseInt(id) })
  }
  switch(selected.type){
    case 'all':
      entries = _.filter(entries, (entry) => { return entry.account_id == account.id })
      break
    case 'unread':
      entries = _.filter(entries, (entry) => { return _.isNil(entry.read_at) && entry.account_id == account.id })
      break
    case 'today':
      entries = _.filter(entries, (entry) => { 
        let date = new Date()
        return entry.published_at > new Date(date.toDateString()).getTime() && _.isNil(entry.read_at) && entry.account_id == account.id
      })
      break
    default: 
      if(!_.isEmpty(ids)) {
        entries = _.filter(entries, (entry) => { 
          return _.includes(ids, entry.stream_id) 
        })
      }
  }
  return dispatch({
    type: FILTER,
    items:  entries
  })
}

export const syncEntries = (stream) => (dispatch, state) => {
  return dispatch({
    type: REQUEST,
    sync: {
      url: 'syncEntriesPath',
      params: {
        stream: stream
      }
    }
  }).then(res => {
    let streams = state().Streams.items

    if(streams[streams.length - 1].id === stream){
      dispatch(AppActions.synced())
    }
    let count = res.data.entries.length
    let date = new Date()
    let todayCount = _.filter(res.data.entries, (entry) => {
       return entry.published_at > new Date(date.toDateString()).getTime() && _.isNil(entry.read_at)
    }).length
    dispatch(StreamsActions.update(stream, count))
    dispatch(AccountsActions.updateCount("update", {count: count, unreadCount: count, todayCount: todayCount}))
    dispatch(add(res.data.entries))
    dispatch(filter())
  })
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
    dispatch(read(id))
  })
}


export const destroyEntries = (stream_id) => (dispatch, getState) => {
  dispatch(destroy(stream_id))
  dispatch(filter())
}
