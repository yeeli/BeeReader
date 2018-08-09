import * as AccountsActions from '~/actions/accounts'
import _ from 'lodash'

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
        items: action.account
      }
    case AccountsActions.ADD:
      let accounts = state.items
      accounts.push(action.account)
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: accounts
      }

    default:
      return state
  }
}

export default Account
