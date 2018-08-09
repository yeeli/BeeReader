import * as AppActions from '~/actions/app'
import * as StreamsActions from '~/actions/streams'

export const REQUEST = "ENTRIES_REQUEST"
export const LOAD = "ENTRIES_LOAD"
export const ADD = "ENTRIES_ADD"

export const FILTER = "ENTRIES_FILTER"
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
    let streams = state().Streams.items

    if(streams[streams.length - 1].id === stream){
      dispatch(AppActions.synced())
    }
    dispatch(StreamsActions.update(stream, res.data.entries.length))
    dispatch(add(res.data.entries))
  })
}

export const readEntry = (id) => (dispatch, state) => {
  let entry = _.find(state().Entries.items, {id: id})
  if(!_.isNil(entry.read_at)){
    return false
  }
  return dispatch({
    type: ENTRY_REQUEST,
    sync: {
      url: 'readEntriesPath',
      params: {
        id: id
      }
    }
  }).then(res => {
    dispatch(StreamsActions.update(entry.stream_id, -1))
    dispatch({ type: READ, id: id})
  })
}

export const filter = (type, ids = []) => (dispatch, state) => {
  let filter_type = FILTER_STREAM
  let entries = state().Entries.items
  switch(type){
    case 'unread':
      entries = _.filter(entries, (entry) => { return _.isNull(entry.read_at)})
    case 'today':
      entries = _.filter(entries, (entry) => { 
        let date = new Date()
        return entry.published_at > new Date(date.toDateString()).getTime() 
      })
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
