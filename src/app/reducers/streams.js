import * as StreamsActions from '~/actions/streams'

const defaultState = {
  isFetching: false,
  isLoaded: false,
  items: []
}

const Streams = (state = defaultState, action) => {
  switch(action.type) {
    case StreamsActions.REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoaded: false
      }
    case StreamsActions.LOAD:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: action.items
      }
    case StreamsActions.ADD:
      let streams = state.items
      streams.push(action.item)
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: streams
      }
    case StreamsActions.SYNCING:
      var items = state.items.map( (item) =>{
        if(action.id == item.id) {
          item['sync'] = true
        }
        return item
      })
      return {
        ...state,
        items: items
      }
    case StreamsActions.UPDATE:
      var items = state.items.map( (item) =>{
        if(action.stream == item.id) {
          item['sync'] = false
          var count = item.unread_count + action.count
          item['unread_count'] = count
          item['entries_count'] = count
        }
        return item
      })
      return {
        ...state,
        items: items
      }
    case StreamsActions.READ:
      var items = state.items.map( (item) =>{
        if(action.stream == item.id) {
          var count = item.unread_count - 1
          item['unread_count'] = count
        }
        return item
      })
      return {
        ...state,
        items: items
      }

    default:
      return state
  }
}

export default Streams
