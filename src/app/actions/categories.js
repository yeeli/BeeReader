export const REQUEST = "CATEGORIES_REQUEST"
export const LOAD = "CATEGORIES_LOAD"
export const ADD = "CATEGORIES_ADD"
export const CHANGE = "CATEGORIES_CHANGE"

export const load = (items) => ({
  type: LOAD,
  items: items
})


export const add = (item) => ({
  type: ADD,
  item: item
})

export const change = (add_ids, delete_ids, stream) => ({
  type: CHANGE,
  add_ids, add_ids,
  delete_ids, delete_ids,
  stream: stream
})

export const fetchCategories = (account) => (dispatch, getState) => {
  return dispatch({ 
    type: REQUEST, 
    sync: {
      url: 'categoriesPath', 
      params: { account: account.id }
    }
  }).then(res => {
    dispatch(load(res.data.categories))
  })
}


export const addCategory = (title) => (dispatch, state) =>  {
  return dispatch({
    type: REQUEST,
    sync: { 
      url: 'createCategoriesPath',
      params: {
        account: 1,
        title: title
      }
    }
  }).then(res => {
    dispatch(add(res.data.category))
  })
}


