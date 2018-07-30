export const REQUEST = "ENTRIES_REQUEST"
export const LOAD = "ENTRIES_LOAD"
export const ADD = "ENTRIES_ADD"

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
        account_id: 1
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
        stream_id: stream
      }
    }
  }).then(res => {
    console.log(res.data)
    dispatch(add(res.data.entries))
  })

}
