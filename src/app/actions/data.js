export const REQUEST = "DATA_REQUEST"
export const LOAD = "DATA_LOAD"
export const CLEAR = "DATA_CLEAR"

export const load = (item) => ({
  type: LOAD,
  item: item
})

export const fetchData = (id) => (dispatch, state) => {
  return dispatch({ 
    type: REQUEST, 
    sync: {
      url: 'dataPath',
      params: {
        entry_id: id
      }
    }
  }).then(res => {
    dispatch(load(res.data.data))
  })
}


export const clearData = () => ({
  type: CLEAR
})
