import * as AccountActions from '@/actions/account'

const defaultState = {
  isFetching: false,
  isLoaded: false,
  items: []
}

const Account = (state = defaultState, action) => {
  switch(action.type) {
    case AccountActions.REQUEST:
      return return {
        ...state,
        isFetching: true,
        isLoaded: false
      }
    case AccountActions.LOAD:
      return return {
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
