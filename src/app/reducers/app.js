import * as AppActions from '~/actions/app'

const defaultState = {
  subscribeRss: {}
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
