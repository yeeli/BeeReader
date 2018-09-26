export const REQUEST_RSS = "REQUEST_RSS"
export const CLEAR = "APP_CLEAR"

export const SYNCING = "APP_SYNCING"
export const SYNCED = "APP_SYNCED"

export const SET_ACCOUNT = "APP_SET_ACCOUNT"
export const UPDATE_ACCOUNT = "APP_UPDATE_ACCOUNT"

export const SET_STREAM = "APP_SET_STREAM"
export const SET_ENTRY = "APP_SET_ENTRY"

export const OPEN_FOLDER = "APP_OPEN_FOLDER"
export const CLOSE_FOLDER = "APP_CLOSE_FOLDER"

export const SET_LOCALE = "APP_SET_LOCALE"

export const fetchRss = (url) => (dispatch, getState) => {
  return dispatch({
    type: REQUEST_RSS,
    sync: { 
      url: 'showRssPath',
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

export const setCurrentAccount = (account) => ({
  type: SET_ACCOUNT,
  account: account
})

export const setSelectedStream = (selected) => ({
  type: SET_STREAM, 
  selected: selected
})

export const setSelectedEntry = (selected) => ({
  type: SET_ENTRY,
  selected: selected
})

export const openFolder = (id) => ({
  type: OPEN_FOLDER,
  id: id 
})

export const clear = () => ({
  type: CLEAR
})

export const setLocale = (lang) => ({
  type: SET_LOCALE,
  locale: lang
})
