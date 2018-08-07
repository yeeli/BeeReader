export const REQUEST = "FOLDERS_REQUEST"
export const LOAD = "FOLDERS_LOAD"
export const ADD = "FOLDERS_ADD"
export const OPEN = "FOLDERS_OPEN"

export const load = (items) => ({
  type: LOAD,
  items: items
})

export const add = (items) => ({
  type: ADD,
  items: items
})

export const fetchFolders = () => dispatch => {
  return dispatch({
    type: REQUEST, 
    sync: { 
      url: 'foldersPath' 
    }
  }).then(res => {
    dispatch(load(res.data.folders))
  })
}

export const openFolder = (folder) => dispatch => {
  return dispatch({
    type: OPEN,
    folder: { type: 'Category', id: folder.id} 
  })
}
