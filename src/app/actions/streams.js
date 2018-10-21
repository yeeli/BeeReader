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

export const fetchStreams = (account) => (dispatch, getState) => {
  return dispatch({
    type: REQUEST, 
    sync: { 
      url: 'streamsPath',
      params: { account: account.id }
    }
  }).then(res => {
    dispatch(load(res.data.streams))
  })
}


export const addStream = (url, categories) => (dispatch, getState) => {
  let { currentAccount } = getState().App
  return dispatch({
    type: ACTION_REQUEST,
    sync: {
      url: 'createStreamsPath',
      params: {
        account: currentAccount.id,
        url: url,
        categories: categories
      }
    }
  }).then(res => {
    if(res.meta.status == "success") {
      let stream = res.data.stream
      dispatch(add(stream))
      dispatch(CategoriesActions.fetchCategories(currentAccount))
      dispatch(FoldersActions.change(res.data.folders))
    }
    return Promise.resolve(res)
  })
}

export const importStream = (data) => (dispatch, getState) => {
  let { currentAccount } = getState().App
  return dispatch({
    type: ACTION_REQUEST,
    sync: {
      url: 'importStreamsPath',
      params: {
        account: currentAccount.id,
        data:  JSON.stringify({'data': data})
      }
    }
  }).then(res => {
    if( res.meta.status == "success" ) {
    }
    Promise.resolve(res)
  })
}

export const destroyStream = (id) => (dispatch, getState) => {
  let { currentAccount } = getState().App
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
        count: currentAccount.entries_count - entries_count, 
        unreadCount: currentAccount.unread_count - unread_count, 
        todayCount: currentAccount.today_count - today_count
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
        categories: categories
      }
    }
  }).then(res => {
    if(res.meta.status === "success") {
      const { add_ids, delete_ids } = res.data
      dispatch(FoldersActions.change(res.data.folders))
      dispatch(CategoriesActions.change(add_ids, delete_ids, id))
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
