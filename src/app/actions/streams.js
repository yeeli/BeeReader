import  * as EntriesActions from '~/actions/entries'
import  * as FoldersActions from '~/actions/folders'
import  * as CategoriesActions from '~/actions/categories'
import  * as AccountsActions from '~/actions/accounts'
import  * as AppActions from '~/actions/app'

export const REQUEST = "STREAMS_REQUEST"
export const ADD_REQUEST = "STREAMS_ADD_REQUEST"
export const DESTROY_REQUEST = "STREAMS_DESTROY_REQUEST"
export const LOAD = "STREAMS_LOAD"
export const ADD = "STREAMS_ADD"
export const DELETE = "STREAMS_DELETE"
export const UPDATE = "STREAMS_UPDATE"
export const READ = "STREAMS_READ"
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

export const update = (stream, count) => dispatch => {
  return dispatch({
    type: UPDATE,
    stream: stream,
    count: count
  })
}

export const read = (stream) => dispatch => {
  return dispatch({
    type: READ,
    stream: stream
  })
}

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
    type: ADD_REQUEST,
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
    type: DESTROY_REQUEST,
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


