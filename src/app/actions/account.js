export const REQUEST = "ACCOUNT_REQUEST"

export const fetchAccount = () => (dispatch, state) => {
  return dispatch({type: REQUEST})
}
