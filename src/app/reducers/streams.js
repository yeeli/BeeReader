import * as StreamsActions from '~/actions/streams'

const defaultState = {
  isFetching: false,
  isLoaded: false,
  items: []
}

const Streams = (state = [], action) => {
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
    case StreamsActions.SYNCING:
      console.log(action)
      let items = state.items.map( (item) =>{
        if(action.id == item.id) {
          item['sync'] = true
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
