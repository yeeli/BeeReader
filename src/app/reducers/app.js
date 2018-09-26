import * as AppActions from '~/actions/app'
import _ from 'lodash'

import { remote } from 'electron'
const { app } = remote


const defaultState = {
  selectedStream: { type: 'all' },
  selectedEntry: null,
  syncing: false,
  currentAccount: {},
  openFolders: [],
  locale: app.getLocale()
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
        selectedEntry: action.selected
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
      return {
        ...state,
        locale: action.locale
      }

    default:
      return state
  }
}

export default App
