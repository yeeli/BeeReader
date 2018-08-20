import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import Routers from '~/routers'

import '~/shared/layout.sass'

import locale from '~/utils/locale'

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
})

const Root = ({ store, history }) =>{
  let currentLocale = locale.getLocale('zh-CN')
  return (
  <MuiThemeProvider theme={theme}>
      <IntlProvider locale='zh-CN' messages={currentLocale}>
      <Provider store={store}>
        <Routers history={history}/>
      </Provider>
    </IntlProvider>
  </MuiThemeProvider>
)
}
export default Root
