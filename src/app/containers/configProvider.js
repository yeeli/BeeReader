import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'

import Locale from '~/utils/locale'
import SetMenu from '~/utils/menu'

class ConfigProvider extends Component {
  render() {
    const { App, s, h } = this.props
    let  currentLocale = Locale.getLocale(App.locale)
    SetMenu(s, h, currentLocale)
    return (
      <IntlProvider key={currentLocale.locale} locale={currentLocale.locale} messages={currentLocale}>
        { this.props.children }
      </IntlProvider>
    )
  }
}

const mapStateToProps = state => {
  return { App: state.App }
}

export default connect(mapStateToProps)(ConfigProvider)
