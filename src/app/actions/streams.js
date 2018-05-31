export const REQUEST = "STREAMS_REQUEST"
export const LOAD = "STREAMS_LOAD"

export const load = (items) => ({
  type: LOAD,
  items: items
})

export const fetchStreams = () => (dispatch,state)=> {
  return dispatch({
    type: REQUEST, 
    sync: { url: 'streamsPath' }
  }).then(res => {
    dispatch(load(res.data.streams))
  })
}
