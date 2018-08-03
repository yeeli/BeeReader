export const REQUEST = "ENTRIES_REQUEST"
export const LOAD = "ENTRIES_LOAD"
export const ADD = "ENTRIES_ADD"

export const FILTER_UNREAD = "ENTRIES_FILTER_UNREAD"
export const FILTER_TODAY = "ENTRIES_FILTER_TODAY"
export const FILTER_STREAM = "ENTRIES_FILTER_STREAM"

export const ENTRY_REQUEST = "ENTRY_REQUEST"
export const READ = "ENTRY_READ"

export const load = (items) => ({
  type: LOAD,
  items: items
})

export const add = (items) => ({
  type: ADD,
  items: items
})

export const fetchEntries = () => (dispatch, state) => {
  return dispatch({
    type: REQUEST, 
    sync: { 
      url: 'entriesPath',
      params: {
        account: 1
      }
    }
  }).then(res => {
    dispatch(load(res.data.entries))
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
    dispatch(add(res.data.entries))
  })
}

export const readEntry = (id) => (dispatch, state) => {
  return dispatch({
    type: ENTRY_REQUEST,
    sync: {
      url: 'readEntriesPath',
      params: {
        id: id
      }
    }
  }).then(res => {
    dispatch({ type: READ, id: id})
  })
}

export const filter = (type, ids = []) => (dispatch, state) => {
  let filter_type = FILTER_STREAM

  if(type == 'unread') {
    filter_type = FILTER_UNREAD
  }
  if(type == 'today') {
    filter_type = FILTER_TODAY
  }
  return dispatch({
    type: filter_type,
    ids:  ids
  })
}
