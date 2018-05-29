import { combineReducers } from 'redux'
import Account from './account'
import Subscriptions from './subscriptions'
import Categories from './subscriptions'

const rootReducer = combineReducers({
  Subscriptions,
  Account,
  Categories
})

export default rootReducer
