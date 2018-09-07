import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
const { ipcRenderer } = require('electron')

import * as AccountsActions from '~/actions/accounts'
import * as AppActions from '~/actions/app'

const rssJson = require('~/config/rss.json')
console.log(rssJson)


class AppContainer extends Component {
  componentDidUpdate() {
    const {Accounts} = this.props
    //if(Accounts.isLoaded && Accounts.items.length == 0 ) {
    //  this.props.dispatch(AccountsActions.createAccount('Rss'))
    //}
  }

  render () {
    const {Accounts, App} = this.props
    if( Accounts.isLoaded && Accounts.items.length > 0 && !_.isEmpty(App.currentAccount)){
      return <Redirect to='/reader' />
    }
    return (
      <div id="app">
        <div className="account-loading">
          <CircularProgress  size={50} />
        </div>
      </div>
    )
  }
}

import './index.sass'

const mapStateToProps = state => {
  const { Accounts, App } = state
  return { Accounts, App }
}


export default connect(mapStateToProps)(AppContainer)
