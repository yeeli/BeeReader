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
        items: action.items,
        filterItems: action.items
      }
    case EntriesActions.ADD:
      let newEntries = _.union(action.items, state.items)
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: newEntries
      }
    case EntriesActions.READ:
      var entries = state.items.map( item => {
        if(item.id == action.id) {
          item['read_at'] = Date.now()
        }
        return item
      })
      var filterEntries = state.filterItems.map( item => {
        if(item.id == action.id) {
          item['read_at'] = Date.now()
        }
        return item
      })
      return {
        ...state,
        items: entries,
        filterItems: filterEntries
      }
    case EntriesActions.FILTER:
      return {
        ...state,
        filterItems: action.items
      }
    default:
      return state
  }
}

export default Entries
