import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
const { ipcRenderer } = require('electron')

import * as AccountActions from '@/actions/account'


class AppContainer extends Component {
  componentDidMount() {
    this.props.dispatch(AccountActions.fetchAccount())
  }
  render () {
    if(this.props.account.length > 0 ) {
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
  return { account: state.Account.items }
}


export default connect(mapStateToProps)(AppContainer)
