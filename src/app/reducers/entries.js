import * as EntriesActions from '~/actions/entries'
import _ from 'lodash'

const defaultState = {
  isFetching: false,
  isLoaded: false,
  items: [],
  filterItems: []
}

const Entries = (state = defaultState, action) => {
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
    case EntriesActions.ADD:
      let newEntries = _.union(action.items, state.items)
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: newEntries
      }
    default:
      return state
  }
}

export default Entries
