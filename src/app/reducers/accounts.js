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
      var accounts = state.items
      accounts.push(action.account)
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: accounts
      }
    case AccountsActions.UPDATE_COUNT:
      var accounts = state.items.map(account => { 
        if(account.id === action.account.id){
          account = action.account
        }
        return account
      })
      return {
        ...state,
        items:  accounts
      }
    default:
      return state
  }
}

export default Account
