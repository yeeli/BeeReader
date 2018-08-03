import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import App from './app'
import Accounts from './accounts'
import Folders from './folders'
import Categories from './categories'
import Streams from './streams'
import Entries from './entries'
import Data from './data'


const rootReducer = combineReducers({
  App,
  Accounts,
  Folders,
  Categories,
  Streams,
  Entries,
  Data,
  Router: routerReducer
})

export default rootReducer
