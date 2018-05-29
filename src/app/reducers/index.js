import { combineReducers } from 'redux'
import Accounts from './accounts'
import Subscriptions from './subscriptions'
import Categories from './subscriptions'

const rootReducer = combineReducers({
  Subscriptions,
  Accounts,
  Categories
})

export default rootReducer
