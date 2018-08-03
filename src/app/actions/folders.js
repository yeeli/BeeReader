export const REQUEST = "FOLDERS_REQUEST"
export const LOAD = "FOLDERS_LOAD"

export const load = (items) => ({
  type: LOAD,
  items: items
})

export const fetchFolders = () => (dispatch, state) => {
  return dispatch({
    type: REQUEST, 
    sync: { 
      url: 'foldersPath' 
    }
  }).then(res => {
    dispatch(load(res.data.folders))
  })
}
