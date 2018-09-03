import * as AppActions from '~/actions/app'

export const REQUEST = "ACCOUNT_REQUEST"
export const LOAD = "ACCOUNT_LOAD"
export const ADD = "ACCOUNT_ADD"
export const UPDATE_COUNT = "ACCOUNT_UPDATE_COUNT"

export const load = (accounts) => ({
  type: LOAD,
  accounts: accounts
})

export const add = (account) => ({
  type: ADD,
  account: account 
})

export const fetchAccounts = () => dispatch => {
  return dispatch({
    type: REQUEST,
    sync: {url: "accountsPath"}
  }).then(res => {
    if(res.meta.status == "success") {
      dispatch(load(res.data.accounts))
    }
    return Promise.resolve(res)
  })
}

export const createAccount = (service) => dispatch => {
  return dispatch({
    type: REQUEST,
    sync: {url: "createAccountsPath", params: {service: service}}
  }).then(res => {
    if(res.meta.status == "success") {
      let account = res.data.account
      dispatch(AppActions.setCurrentAccount(account))
      dispatch(add(account))
    }
  })
}

export const updateCount = (type = "update", data) => (dispatch, getState) => {
  let account = getState().App.currentAccount
  if(type === "read") {
    account.unread_count -= 1
    let date = new Date()
    if(data.published_at > new Date(date.toDateString()).getTime()){
      account.today_count -= 1
    }
  }
  if(type === "update"){
    if(!_.isNil(data.count)){
      account.entries_count =  data.count
    }
    if(!_.isNil(data.unreadCount)) {
      account.unread_count =  data.unreadCount
    }
    if(!_.isNil(data.todayCount)) {
      account.today_count = data.todayCount
    }
  }
  dispatch(AppActions.setCurrentAccount(account))

  return dispatch({
    type: UPDATE_COUNT,
    account: account
  })
}
