import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class AppContainer extends Component {
  componentWillMount() {
  }
  render () {
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
  return { account: state.account }
}


export default connect(mapStateToProps)(AppContainer)
