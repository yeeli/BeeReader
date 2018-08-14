import * as AppActions from '~/actions/app'
import _ from 'lodash'

const defaultState = {
  selectedStream: { type: 'all' },
  selectedEntry: null,
  syncing: false,
  currentAccount: {},
  openFolders: []
}

const App = (state = defaultState, action) => {
  switch(action.type) {
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
    case AppActions.UPDATE_ACCOUNT:
     return {
       ...state,
       currentAccount: {
         ...state.currentAction,
         entries_count: action.entriesCount,
         unread_count: action.unreadCount
       }
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
      console.log(openFolders)
      return {
        ...state,
        openFolders: openFolders
      }
    default:
      return state
  }
}

export default App
