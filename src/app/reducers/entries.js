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
        items: newEntries,
        filterItems: newEntries
      }
    case EntriesActions.READ:
      var entries = state.items.map( item => {
        if(item.id == action.id) {
          item['read_at'] = Date.now()
        }
        return item
      })
      return {
        ...state,
        items: entries,
        filterItems: entries
      }
    case EntriesActions.FILTER_ALL:
      return {
        ...state,
        filterItems: state.items  
      }
    case EntriesActions.FILTER_UNREAD:
      var entries = _.filter(state.items, (entry) => { return _.isNull(entry.read_at)})
      return {
        ...state,
        filterItems: entries 
      }
    case EntriesActions.FILTER_TODAY:
      var entries = _.filter(state.items, (entry) => { 
        let date = new Date()
        return entry.published_at > new Date(date.toDateString()).getTime() 
      })
      return {
        ...state,
        filterItems: entries 
      }
    default:
      return state
  }
}

export default Entries
