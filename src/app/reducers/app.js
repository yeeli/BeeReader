import * as AppActions from '~/actions/app'

const defaultState = {
  subscribeRss: {},
  selectedStream: 'all',
  selectedEntry: null,
  syncing: false
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
    default:
      return state
  }
}

export default App
