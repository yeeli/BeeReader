export const REQUEST = "SUBSCRIPTIONS_REQUEST"
export const LOAD = "SUBSCRIPTIONS_LOAD"

export const load = (items) => ({
  type: LOAD,
  items: items
})

export const fetchSubscriptions = () => (dispatch,state)=> {
  return dispatch({
    type: REQUEST, 
    sync: {url: 'subscriptionsPath' }
  }).then(res => {
    dispatch(load(res.data))
  })
}
