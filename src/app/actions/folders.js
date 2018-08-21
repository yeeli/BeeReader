export const REQUEST = "FOLDERS_REQUEST"
export const LOAD = "FOLDERS_LOAD"
export const ADD = "FOLDERS_ADD"
export const DELETE = "FOLDERS_DELETE"
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

export const destroyFolder = (id) => dispatch => {
  return dispatch({
    type: DELETE,
    id: id
  })
}
