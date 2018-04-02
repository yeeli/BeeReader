import React, { Component } from 'react'
import { Provider } from 'react-redux'

import '@/shared/layout.sass'
import Routers from '@/routers'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Root = ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Routers />
    </MuiThemeProvider>
  </Provider>
)
export default Root
