export const REQUEST = "CATEGORIES_REQUEST"
export const LOAD = "CATEGORIES_LOAD"

export const load = (items) => ({
  type: LOAD,
  items: items
})

export const fetchCategories = () => (dispatch, state) => {
  return dispatch({ type: REQUEST, sync: {url: 'categoriesPath', params: {account_id: 1}}}).then(res => {
    dispatch(load(res.data.categories))
  })
}

