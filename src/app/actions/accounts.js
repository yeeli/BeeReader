export const REQUEST = "ACCOUNT_REQUEST"
export const LOAD = "ACCOUNT_LOAD"
export const ADD = "ACCOUNT_ADD"

export const load = (account) => ({
  type: LOAD,
  account: account 
})

export const add = (account) => ({
  type: ADD,
  account: account 
})


export const fetchAccounts = () => (dispatch, state) => {
  return dispatch({
    type: REQUEST, 
    sync: {url: "accountsPath"}
  }).then(res => {
    dispatch(load(res.data.account))
  })
}

export const createAccount = (service) => (dispatch, state) => {
  return dispatch({
    type: REQUEST, 
    sync: {url: "createAccountsPath", params: {service: service}}
  }).then(res => {
    if(res.meta.status == "success") {
      dispatch(add(res.data.account))
    }
  })
}
