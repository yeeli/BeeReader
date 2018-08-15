import  * as EntriesActions from '~/actions/entries'
import  * as FoldersActions from '~/actions/folders'
import  * as CategoriesActions from '~/actions/categories'

export const REQUEST = "STREAMS_REQUEST"
export const ADD_REQUEST = "STREAMS_ADD_REQUEST"
export const LOAD = "STREAMS_LOAD"
export const ADD = "STREAMS_ADD"
export const SYNCING = "STREAMS_SYNCING"
export const UPDATE = "STREAMS_UPDATE"
export const READ = "STREAMS_READ"


export const load = (items) => ({
  type: LOAD,
  items: items
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

export const add = (item) => ({
  type: ADD,
  item: item
})

export const addStream = (url, categories) => (dispatch, getState) => {
  account = getState().app.currentAccount
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
