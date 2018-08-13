import * as AppActions from '~/actions/app'

const defaultState = {
  subscribeRss: {},
  selectedStream: { type: 'all' },
  selectedEntry: null,
  syncing: false,
  currentAccount: {}
}

const App = (state = defaultState, action) => {
  switch(action.type) {
    case AppActions.LOAD_RSS:
      return {
        ...state,
        subscribeRss: action.item
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
    default:
      return state
  }
}

export default App
