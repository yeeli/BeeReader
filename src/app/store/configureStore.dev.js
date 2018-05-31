import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import rootReducer from '@/reducers'
import syncMiddleware from '@/middleware/sync'
import { composeWithDevTools } from 'redux-devtools-extension';

import createHistory from 'history/createHashHistory'


const logger = createLogger()
export const history = createHistory()

const historyMiddleware = routerMiddleware(history)

const middlewares = [thunk, logger, syncMiddleware, historyMiddleware]


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : composeWithDevTools({ realtime: true, port: 5678 });

export const configureStore = (history, preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(...middlewares),
    )
  )

    /*if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }*/

  return store
}
