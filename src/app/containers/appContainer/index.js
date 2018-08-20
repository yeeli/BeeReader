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


class AppContainer extends Component {

  componentWillMount() {
    const {Accounts} = this.props
    if(Accounts.isLoaded && Accounts.items.length == 0 ) {
      this.props.dispatch(AccountsActions.createAccount('Rss')).then(res => {
        if(res.meta.status == "success"){
          this.props.dispatch(AccountsActions.fetchAccounts()).then( res => {
            if(res.meta.status == "success"){
              let account = _.find(res.data.account, {service: 'Rss'})
              this.props.dispatch(AppActions.setCurrentAccount(account))
            }
          })
        }
      })
    }
  }

  render () {
    if(this.props.Accounts.items.length > 0 ) {
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
  const { Accounts } = state
  return { Accounts }
}


export default connect(mapStateToProps)(AppContainer)
