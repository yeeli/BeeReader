export const REQUEST = "STREAMS_REQUEST"
export const LOAD = "STREAMS_LOAD"
export const ADD = "STREAMS_ADD"
export const SYNCING = "STREAMS_SYNCING"

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

export const addStream = (url, categories) => dispatch => {
  return dispatch({
    type: REQUEST,
    sync: {
      url: 'createStreamsPath',
      params: {
        account: 1,
        url: url,
        categories: categories
      }
    }
  }).then(res => {
    dispatch(add(res.data.streams))
  })
}
