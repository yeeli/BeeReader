import React, { Component } from 'react'
import { Provider } from 'react-redux'

import App from './App';
import '../shared/layout.sass'
import Sync from '../../utils/reader_sync'

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
)
export default Root

