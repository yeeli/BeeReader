import * as AccountsActions from '~/actions/accounts'

const defaultState = {
  isFetching: false,
  isLoaded: false,
  items: []
}

const Account = (state = defaultState, action) => {
  switch(action.type) {
    case AccountsActions.REQUEST:
      return{
        ...state,
        isFetching: true,
        isLoaded: false
      }
    case AccountsActions.LOAD:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: action.items
      }
    default:
      return state
  }
}

export default Account
