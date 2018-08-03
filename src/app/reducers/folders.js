import * as FoldersActions from '~/actions/folders'

const defaultState = {
  isFetching: false,
  isLoaded: false,
  items: []
}

const Folders = (state = defaultState, action) => {
  switch(action.type) {
    case FoldersActions.REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoaded: false
      }
    case FoldersActions.LOAD:
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

export default Folders
