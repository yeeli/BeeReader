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
export const READ = "STREAMS_READ"
export const READ_ALL = "STREAMS_READ_ALL"
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


export const readAll = () => ({
  type: READ_ALL
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
      dispatch(AccountsActions.updateCount("update", {count: -entries_count, unreadCount: -unread_count, todayCount: -today_count}))
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
        dispatch(EntriesActions.readAll())
        dispatch(readAll())
        dispatch(AccountsActions.updateCount('readAll'))
      }
      if(type === "today") {
        let entries = dispatch(EntriesActions.filter())
        console.log(_.map(entries, 'id'))
      }
      if(type === "category") {
      }
      if(type === "stream") {
      }
    } else {
      alert("read failed")
    }
  })
}
