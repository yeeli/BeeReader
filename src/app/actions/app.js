export const REQUEST_RSS = "REQUEST_RSS"

export const SYNCING = "SYNCING"
export const SYNCED = "SYNCED"

export const SET_ACCOUNT = "APP_SET_ACCOUNT"
export const UPDATE_ACCOUNT = "APP_UPDATE_ACCOUNT"

export const SET_STREAM = "APP_SET_STREAM"
export const SET_ENTRY = "APP_SET_ENTRY"

export const OPEN_FOLDER = "APP_OPEN_FOLDER"
export const CLOSE_FOLDER = "APP_CLOSE_FOLDER"

export const fetchRss = (url) => (dispatch, getState) => {
  return dispatch({
    type: REQUEST_RSS,
    sync: { 
      url: 'rssStreamsPath',
      params: { url: url }
    }
  }).then( res => {
    return Promise.resolve(res)
  })
}

export const syncing = () => ({
  type: SYNCING
})

export const synced = () => ({
  type: SYNCED
})

export const setCurrentAccount = (service) => (dispatch, getState) => {
  let accounts = getState().Accounts.items
  let account = _.find(accounts, {service: service})
  dispatch({
    type: SET_ACCOUNT,
    account: account.id
  })
}

export const setSelectedStream = (selected) => (dispatch, getState) => {
  dispatch({type: SET_STREAM, selected: selected})
}

export const setSelectedEntry = (selected) => (dispatch, getState) => {
  dispatch({type: SET_ENTRY, selected: selected})
}

export const openFolder = (id) => dispatch => {
  return dispatch({
    type: OPEN_FOLDER,
    id: id 
  })
}