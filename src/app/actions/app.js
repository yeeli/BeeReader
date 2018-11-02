export const REQUEST_RSS = "REQUEST_RSS"
export const CLEAR = "APP_CLEAR"

import  * as EntriesActions from '~/actions/entries'
import  * as FoldersActions from '~/actions/folders'
import  * as CategoriesActions from '~/actions/categories'
import  * as DataActions from '~/actions/data'

export const SYNCING = "APP_SYNCING"
export const SYNCED = "APP_SYNCED"

export const SET_ACCOUNT = "APP_SET_ACCOUNT"
export const UPDATE_ACCOUNT = "APP_UPDATE_ACCOUNT"

export const SET_STREAM = "APP_SET_STREAM"
export const SET_ENTRY = "APP_SET_ENTRY"

export const OPEN_FOLDER = "APP_OPEN_FOLDER"
export const CLOSE_FOLDER = "APP_CLOSE_FOLDER"

export const SET_LOCALE = "APP_SET_LOCALE"
export const SET_REFRESH = "APP_SET_REFRESH"

// open opml file import page
export const OPEN_IMPORT = "APP_OPEN_IMPORT"

// Show tips
export const OPEN_TIPS = "APP_OPEN_TIPS"
export const CLOSE_TIPS = "APP_CLOSE_TIPS"

// Show QRCODE
export const TOGGLE_QR = "APP_TOGGLE_QR"
export const CLOSE_QR = "APP_CLOSE_QR"

// New Subscription in app type
export const OPEN_NEW_SUBSCRIPTION = "APP_OPEN_NEW_SUBSCRIPTION"
export const CLOSE_NEW_SUBSCRIPTION = "APP_CLOSE_NEW_SUBSCRIPTION"

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

export const setRefresh = (time) => ({
  type: SET_REFRESH,
  time: time
})

export const openImport = () => ({
  type: OPEN_IMPORT
})

export const openTips = (msg) => ({
  type: OPEN_TIPS,
  message: msg
})

export const closeTips = () => ({
  type: CLOSE_TIPS
})

export const toggleQR = () => ({
  type: TOGGLE_QR
})

export const closeQR = () => ({
  type: CLOSE_QR
})


export const openNewSubscription = () => ({
  type: OPEN_NEW_SUBSCRIPTION
})

export const closeNewSubscription = () => ({
  type: CLOSE_NEW_SUBSCRIPTION
})

export const filterEntries = (selected) => (dispatch, getState) => {
  dispatch(DataActions.clearData())
  dispatch(closeQR())
  dispatch(setSelectedStream(selected))
  dispatch(EntriesActions.filterEntries())
}
