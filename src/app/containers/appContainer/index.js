import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom'
import {injectIntl, FormattedMessage} from 'react-intl'
import _ from 'lodash'

// Material Ui
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// Fontawesome Icons

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons'

// Layout
import BasicLayout from '~/layouts/basicLayout'

// Actions

import * as AccountsActions from '~/actions/accounts'
import * as AppActions from '~/actions/app'
import * as StreamsActions from '~/actions/streams'
import * as CategoriesActions from '~/actions/categories'
import * as FoldersActions from '~/actions/folders'

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
        this.props.history.push("/reader")
      })
    }
  }

  handleClickSkip = (event) => {
    const {Accounts} = this.props
    this.setState({ creating: true })
    if(Accounts.isLoaded && Accounts.items.length == 0 ) {
      this.props.dispatch(AccountsActions.createAccount('Rss'))
    }
  }

  render () {
    const {Accounts, App} = this.props
    if( Accounts.isLoaded && Accounts.items.length > 0 && !_.isEmpty(App.currentAccount)){
      return <Redirect to='/reader' />
    }
    return (
      <BasicLayout>
        <div id="app">
          <div className="app-hd" style={{"WebkitAppRegion": "drag"}}></div>
          <div className="app-bd">
            <div className="block-sites">
              <div className="block-hd">
                <Typography variant="subheading" gutterBottom>
                  <FormattedMessage id="siteRecommends" defaultMessage="Site Recommends"/>
                </Typography> 
              </div>
              <Grid container  spacing={16} className="listing-sites">
                {
                  Object.entries(rssJson["cn"]).map((rss, index) => {
                    return (
                      <Grid item xs={3} key={index}>
                        <Paper className="site-item" onClick={this.handleClickSite(rss[1])} color="#fff">
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
              >

              <FormattedMessage id="skip" defaultMessage="Skip"/>
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={ this.state.creating }
              onClick={ this.handleClickSubscribe }
            >
              <FormattedMessage id="subscribe" defaultMessage="Subscribe"/>
            </Button>
          </div>
        </div>
      </div>
    </BasicLayout>
    )
  }
}

import './index.sass'

const mapStateToProps = state => {
  const { Accounts, App } = state
  return { Accounts, App }
}


export default connect(mapStateToProps)(injectIntl(AppContainer))
