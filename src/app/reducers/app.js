import * as AppActions from '~/actions/app'

const defaultState = {
  subscribeRss: {},
  selectedStream: 'all',
  selectedEntry: null
}

const App = (state = defaultState, action) => {
  switch(action.type) {
    case AppActions.LOAD_RSS:
      return {
        ...state,
        subscribeRss: action.item
      }
    default:
      return state
  }
}

export default App
