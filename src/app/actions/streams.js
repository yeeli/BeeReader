import  * as EntriesActions from '~/actions/entries'
import  * as FoldersActions from '~/actions/folders'
import  * as CategoriesActions from '~/actions/categories'
import  * as AccountsActions from '~/actions/accounts'
import  * as AppActions from '~/actions/app'

export const REQUEST = "STREAMS_REQUEST"
export const ACTION_REQUEST = "STREAMS_ACTION_REQUEST"
export const LOAD = "STREAMS_LOAD"
export const ADD = "STREAMS_ADD"
export const DELETE = "STREAMS_DELETE"
export const UPDATE = "STREAMS_UPDATE"
export const UPDATE_COUNT = "STREAMS_UPDATE_COUNT"
export const READ = "STREAMS_READ"
export const READ_STREAMS = "STREAMS_READ_STREAMS"
export const SYNCING = "STREAMS_SYNCING"


export const load = (items) => ({
  type: LOAD,
  items: items
})

export const add = (item) => ({
  type: ADD,
  item: item
})

export const destroy = (stream) => ({
  type: DELETE,
  id: stream
})

export const update = (stream, count) => ({
  type: UPDATE,
  stream: stream,
  count: count
})

export const read = (stream) => ({
  type: READ,
  stream: stream
})


export const readStreams = (streams) => ({
  type: READ_STREAMS,
  streams: streams
})

export const fetchStreams = () => dispatch => {
  return dispatch({
    type: REQUEST, 
    sync: { 
      url: 'streamsPath' 
    }
  }).then(res => {
    dispatch(load(res.data.streams))
  })
}


export const addStream = (url, categories) => (dispatch, getState) => {
  let account = getState().App.currentAccount
  return dispatch({
    type: ACTION_REQUEST,
    sync: {
      url: 'createStreamsPath',
      params: {
        account: account.id,
        url: url,
        categories: categories
      }
    }
  }).then(res => {
    if(res.meta.status == "success") {
      let stream = res.data.stream
      dispatch(add(stream))
      dispatch(CategoriesActions.fetchCategories())
      dispatch(FoldersActions.add(res.data.folders))
      dispatch(EntriesActions.syncEntries(stream.id))
    }
  })
}

export const destroyStream = (id) => (dispatch, getState) => {
  let account = getState().App.currentAccount
  return dispatch({
    type: ACTION_REQUEST,
    sync: {
      url: 'destroyStreamsPath',
      params: {
        id: id
      }
    }
  }).then(res => {
    if(res.meta.status === "success") {
      dispatch(AppActions.clear())
      dispatch(FoldersActions.destroyFolder(id))
      dispatch(EntriesActions.destroyEntries(id))
      let { entries_count, unread_count, today_count } = res.data
      dispatch(AccountsActions.updateCount("update", {
        count: account.entries_count - entries_count, 
        unreadCount: account.unread_count - unread_count, 
        todayCount: account.today_count - today_count
      }))
      dispatch(destroy(id))
    }
  })
}

export const updateStream = (id, title, categories) => (dispatch, getState) => {
  return dispatch({
    type: ACTION_REQUEST,
    sync: {
      url: 'updateStreamsPath',
      params: {
        id: id,
        title: title,
        categories
      }
    }
  })
}


export const makeAllRead = () => (dispatch, getState) => {
  const { selectedStream, currentAccount } = getState().App
  const {type, id} = selectedStream
  let unreadCount = 0
  let todayCount = 0
  let streams, streamsKeys
  return dispatch({
    type: ACTION_REQUEST,
    sync: {
      url: 'makeAllReadStreamsPath',
      params: {
        account: currentAccount.id,
        type: type,
        id: id
      }
    }
  }).then(res => {
    if(res.meta.status === "success") {
      if(type === "all" || type === "unread") {
        streams = 'all'
        streamsKeys = 'all'
        dispatch(AccountsActions.updateCount('update', {unreadCount: 0, todayCount: 0}))
      }else {
        unreadCount = currentAccount.unread_count - res.data.unread_count
        todayCount = currentAccount.today_count - res.data.today_count
        streams = res.data.streams_count
        streamsKeys = _.keys(streams)
      }
      dispatch(EntriesActions.readAll(streamsKeys))
      dispatch(readStreams(streams))
      dispatch(AccountsActions.updateCount('update', {
        unreadCount: unreadCount, 
        todayCount: todayCount
      }))
    } else {
      alert("read failed")
    }
  })
}
