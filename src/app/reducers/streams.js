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
      var streams = state.items
      streams.push(action.item)
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: streams
      }
    case StreamsActions.DELETE:
      var streams = state.items
      _.remove(streams, (item) => { return item.id === action.id })
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: streams
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
    case StreamsActions.READ_STREAMS:
      if(action.streams == 'all') {
        var items = state.items.map( (item) =>{
          item['unread_count'] = 0
          return item
        })
      } else {
        var items = state.items.map( (item) => {
          var count = action.streams[item.id]
          if(!_.isNil(count)) {
            item['unread_count'] = item.unread_count - count
          }
          return item
        })
      }
      return {
        ...state,
        items: items
      }
    default:
      return state
  }
}

export default Streams
