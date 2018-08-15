import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import rootReducer from '~/reducers'
import syncMiddleware from '~/middleware/sync'

export const history = createHistory()

const historyMiddleware = routerMiddleware(history)

const middlewares = [thunk, syncMiddleware, historyMiddleware]

export const configureStore = (history, preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares),
  )

  return store
}
