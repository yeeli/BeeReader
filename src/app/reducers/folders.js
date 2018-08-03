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
    case FoldersActions.OPEN:
      let folders = state.items.map( folder => {
        if( folder.source_type == action.folder.type && folder.source_id == action.folder.id){
          folder.opened = folder.opened == 1 ? 0 : 1
        }
        return folder
      })
      console.log(folders)
      return {
        ...state,
        items: folders
      }
    default:
      return state
  }
}

export default Folders
