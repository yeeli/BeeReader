import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons'

import * as AccountsActions from '~/actions/accounts'
import * as AppActions from '~/actions/app'
import * as StreamsActions from '~/actions/streams'

import rssJson from '~/config/rss.json'


class AppContainer extends Component {
  state = {
    selectedSites: [],
    creating: false
  }

  handleClickSite = (url) => (event) => {
    let sites = this.state.selectedSites
    let index = sites.indexOf(url)
    if(index != -1 ){
      _.pull(sites, url)
    } else {
      sites.push(url)
    }
    this.setState({selectedSites: sites})
  }

  handleClickSubscribe = (event) => {
    const {Accounts} = this.props
    this.setState({ creating: true })
    if(Accounts.isLoaded && Accounts.items.length == 0 ) {
      this.props.dispatch(AccountsActions.createAccount('Rss')).then(res => {
        for(let [index,item] of this.state.selectedSites.entries()) {
          this.props.dispatch(StreamsActions.addStream(item))
        }
        this.setState({ creating: false })
      })
    }
  }

  handleClickSkip = (event) => {
    const {Accounts} = this.props
    this.setState({ creating: true })
    if(Accounts.isLoaded && Accounts.items.length == 0 ) {
      this.props.dispatch(AccountsActions.createAccount('Rss'))
      this.setState({ creating: false })
    }
  }

  render () {
    const {Accounts, App} = this.props
    if( !this.state.creating && Accounts.isLoaded && Accounts.items.length > 0 && !_.isEmpty(App.currentAccount)){
      return <Redirect to='/reader' />
    }
    return (
      <div id="app">
        <div className="app-hd" style={{"WebkitAppRegion": "drag"}}></div>
        <div className="app-bd">
          <div className="block-sites">
            <div className="block-hd">
              <Typography variant="subheading" gutterBottom>
                Site Recommends
              </Typography> 
            </div>
            <Grid container  spacing={16} className="listing-sites">
              {
                Object.entries(rssJson["cn"]).map((rss, index) => {
                  return (
                    <Grid item xs={3} key={index}>
                      <Paper className="site-item" onClick={this.handleClickSite(rss[1])}>
                        <div className="site-action">
                          {this.state.selectedSites.indexOf(rss[1]) === -1 ?
                              <FontAwesomeIcon icon={faCheckCircle} color="#999"/>
                           :
                              <FontAwesomeIcon icon={faCheckCircle} color="#2196f3"/>
                          }
                          
                        </div>
                        <div className="site-name">{rss[0]}</div>
                        <div className="site-rss">{rss[1]}</div>
                      </Paper>
                    </Grid>
                  )
                })
              }
            </Grid>
          </div>
          <div className="step-actions">
          <Button
              variant="contained"
              color="default"
              disabled={ this.state.creating }
              onClick={ this.handleClickSkip }
            >Skip</Button>
            <Button
              variant="contained"
              color="primary"
              disabled={ this.state.creating }
              onClick={ this.handleClickSubscribe }
            >Subscribe</Button>
          </div>
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
