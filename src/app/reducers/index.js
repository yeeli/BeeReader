import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import App from './app'
import Accounts from './accounts'
import Categories from './categories'
import Streams from './streams'
import Entries from './entries'
import Datas from './datas'


const rootReducer = combineReducers({
  App,
  Accounts,
  Categories,
  Streams,
  Entries,
  Datas,
  Router: routerReducer
})

export default rootReducer
