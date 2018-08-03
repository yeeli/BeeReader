export const REQUEST = "ACCOUNT_REQUEST"
export const LOAD = "ACCOUNT_LOAD"

export const load = (account) => ({
  type: LOAD,
  account: account 
})

export const fetchAccount = () => (dispatch, state) => {
  return dispatch({
    type: REQUEST, 
    sync: {url: "accountsPath"}
  }).then(res => {
    dispatch(load(res.data.account))
  })
}
