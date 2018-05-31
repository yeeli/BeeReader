export const REQUEST = "DATAS_REQUEST"
export const LOAD = "DATAS_LOAD"

export const load = (items) => ({
  type: LOAD,
  items: items
})

export const fetchDatas = () => (dispatch, state) => {
  return dispatch({ type: REQUEST, sync: {url: 'datasPath'}}).then(res => {
    dispatch(load(res.data.datas))
  })
}

