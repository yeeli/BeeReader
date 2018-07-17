import * as EntriesActions from '~/actions/entries'

const defaultState = {
  isFetching: false,
  isLoaded: false,
  items: []
}

const Entries = (state = [], action) => {
  switch(action.type) {
    case EntriesActions.REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoaded: false
      }
    case EntriesActions.LOAD:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: action.items
      }
    default:
      return state
  }
}

export default Entries
