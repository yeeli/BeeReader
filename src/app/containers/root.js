import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { addLocaleData } from 'react-intl'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import Routers from '~/routers'


import ConfigProvider from '~/containers/configProvider'

import zhLocaleData from 'react-intl/locale-data/zh'
import enLocaleData from 'react-intl/locale-data/en'

addLocaleData([...zhLocaleData, ...enLocaleData])

import '~/shared/layout.sass'

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
})

const Root = ({ store, history }) =>{
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConfigProvider s={store} h={history} >
          <Routers history={history}/>
        </ConfigProvider>
      </Provider>
    </MuiThemeProvider>
  )
}


import '~/shared/layout.sass'
export default Root
