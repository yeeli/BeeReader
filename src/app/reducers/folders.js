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
    case FoldersActions.ADD:
      var folders = _.union(state.items, action.items)
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: folders
      }
    case FoldersActions.CHANGE:
      var folders = state.items
      _.each(action.items, (item) => {
        var index = _.findIndex(folders, {id: item.id})
        if(index != -1) {
          folders[index] = item
        } else {
          folders.push(item)
        }
      })
      return {
        ...state,
        items: folders
      }
    case FoldersActions.DELETE:
      var folders = state.items
      _.remove(folders, (item) => { return item.source_type == "Stream" && item.source_id == action.id })
      return {
        ...state,
        isFetching: false,
        isLoading: true,
        items: folders
      }
    default:
      return state
  }
}

export default Folders
