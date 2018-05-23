export const REQUEST = "ACCOUNT_REQUEST"
export const LOAD = "ACCOUNT_LOAD"

export const load = (result) => ({
  type: LOAD,
  items: result.data
})

export const fetchAccount = () => (dispatch, state) => {
  return dispatch({
    type: REQUEST, 
    sync: {method: "SYNC", event: "getAccount"}
  }).then(res => {
    load(res)
  })
}
