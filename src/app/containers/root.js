import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import Routers from '~/routers'

import '~/shared/layout.sass'

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
})

const Root = ({ store, history }) => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Routers history={history}/>
    </Provider>
  </MuiThemeProvider>
)
export default Root
