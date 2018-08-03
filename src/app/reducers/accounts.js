import * as AccountsActions from '~/actions/accounts'

const defaultState = {
  isFetching: false,
  isLoaded: false,
  items: [],
  entries_count: 0,
  unread_count: 0,
  today_count: 0
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
        items: action.account
      }
    default:
      return state
  }
}

export default Account
