export const SYNC_REQUEST = "SYNC_REQUEST"

export const syncEntries = () => (dispatch, state) => {
  return dispatch({
    type: SYNC_REQUEST, 
    sync: { url: 'syncPath' }
  })
}
