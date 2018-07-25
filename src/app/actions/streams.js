export const REQUEST = "STREAMS_REQUEST"
export const LOAD = "STREAMS_LOAD"

export const load = (items) => ({
  type: LOAD,
  items: items
})

export const fetchStreams = () => (dispatch,state) => {
  return dispatch({
    type: REQUEST, 
    sync: { 
      url: 'streamsPath' 
    }
  }).then(res => {
    dispatch(load(res.data.streams))
  })
}

export const addStream = (url) => (dispatch, state) => {
  return dispatch({
    type: REQUEST,
    sync: {
      url: 'createStreamsPath',
      params: {
        id: 1,
        url: url
      }
    }
  }).then(res => {
    console.log(res)
  })
}

export const syncStreams = (id) => (dispatch, state) => {
  return dispatch({
    type: REQUEST,
    sync: {
      url: 'syncStreamsPath',
      params: {id: id}
    }
  })
}
