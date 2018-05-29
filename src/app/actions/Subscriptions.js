export const REQUEST = "SUBSCRIPTIONS_REQUEST"
export const LOAD = "SUBSCRIPTIONS_LOAD"

export const load = (items) => ({
  type: LOAD,
  items: items
})

export const fetchSubscriptions = () => (dispatch,state)=> {
  return dispatch({
    type: REQUEST, 
    sync: {method: "SYNC", event: "/subscriptions"}
  }).then(res => {
    dispatch(load(res.data))
  })
}
