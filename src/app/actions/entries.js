export const REQUEST = "ENTRIES_REQUEST"
export const LOAD = "ENTRIES_LOAD"

export const load = (items) => ({
  type: LOAD,
  items: items
})

export const fetchEntries = () => (dispatch, state) => {
  return dispatch({
    type: REQUEST, 
    sync: { url: 'entriesPath'}
  }).then(res => {
    dispatch(load(res.data.entries))
  })

}
