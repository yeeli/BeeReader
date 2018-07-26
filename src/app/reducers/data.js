import * as DataActions from '~/actions/data'

const defaultState = {
  isFetching: false,
  isLoaded: false,
  item: {}
}

const Data = (state = [], action) => {
  switch(action.type) {
    case DataActions.REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoaded: false
      }
    case DataActions.LOAD:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        item: action.item
      }
    default:
      return state
  }
}

export default Data
