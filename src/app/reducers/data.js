import * as DataActions from '~/actions/data'

const defaultState = {
  isFetching: false,
  isLoaded: false,
  item: {},
}

const Data = (state = defaultState, action) => {
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
    case DataActions.CLEAR:
      return {
        ...state,
        isFetching: false,
        isLoaded: false,
      }
    default:
      return state
  }
}

export default Data
