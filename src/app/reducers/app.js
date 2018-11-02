import * as AppActions from '~/actions/app'
import _ from 'lodash'
const storage = window.localStorage

import { remote } from 'electron'
const { app } = remote


const defaultState = {
  currentAccount: {},
  selectedStream: { type: 'all' },
  selectedEntry: null,
  syncing: false,
  openFolders: [],
  locale: storage["locale"] || app.getLocale(),
  refresh: storage["refresh"] || "none",
  openTips: false,
  tipsMsg: '',
  openQR: false,
  openNewSubscription: false,
  showData: null
}

const App = (state = defaultState, action) => {
  switch(action.type) {
    case AppActions.CLEAR:
      return {
        ...state,
        selectedStream: { type: 'all'},
        selectedEntry: null
      }
    case AppActions.SYNCING:
      return {
        ...state,
        syncing: true
      }
    case AppActions.SYNCED:
      return {
        ...state,
        syncing: false
      }
    case AppActions.SET_ACCOUNT:
      return {
        ...state,
        currentAccount: action.account
      }
    case AppActions.SET_STREAM:
      return {
        ...state,
        selectedStream: action.selected
      }
    case AppActions.SET_ENTRY:
      return {
        ...state,
        selectedEntry: action.selected,
        openQR: false
      }
    case AppActions.OPEN_FOLDER:
      let openFolders = state.openFolders
      let folderIndex = openFolders.indexOf(action.id)
      if (folderIndex != -1){
        openFolders.splice(folderIndex, 1)
      } else {
        openFolders.push(action.id)
      }
      return {
        ...state,
        openFolders: openFolders
      }
    case AppActions.SET_LOCALE:
      storage["locale"] = action.locale
      return {
        ...state,
        locale: action.locale
      }
    case AppActions.SET_REFRESH:
      storage["refresh"] = action.time
      return {
        ...state,
        refresh: action.time
      }
    case AppActions.OPEN_IMPORT:
      return {
        ...state,
        openImportOPML: true
      }
    case AppActions.OPEN_TIPS:
      return {
        ...state,
        openTips: true,
        tipsMsg: action.message
      }
    case AppActions.CLOSE_TIPS:
      return {
        ...state,
        openTips: false
      }
    case AppActions.TOGGLE_QR:
      return {
        ...state,
        openQR: !state.openQR,
      }
    case AppActions.CLOSE_QR:
      return {
        ...state,
        openQR: false
      }
    case AppActions.OPEN_NEW_SUBSCRIPTION:
      return {
        ...state,
        openNewSubscription: true
      }
    case AppActions.CLOSE_NEW_SUBSCRIPTION:
      return {
        ...state,
        openNewSubscription: false
      }
    default:
      return state
  }
}

export default App
