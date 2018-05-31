import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import Accounts from './accounts'
import Categories from './categories'
import Subscriptions from './subscriptions'
import Entries from './Entries'


const rootReducer = combineReducers({
  Accounts,
  Categories,
  Subscriptions,
  Entries,
  Router: routerReducer
})

export default rootReducer
