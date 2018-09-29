import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {injectIntl, FormattedMessage} from 'react-intl'
import { Link } from 'react-router-dom'

// Material Ui
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/arrowBack'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'


// Actions

import * as AppActions from '~/actions/app'


// Layout

import BasicLayout from '~/layouts/basicLayout'

class GeneralContainer extends Component {

  handleChangeLanguage = event => {
    let value = event.target.value
    this.props.dispatch(AppActions.setLocale(value))
  }

  render() {
    const { App } = this.props
    return (
      <BasicLayout>
        <div id="preferences">
          <div className="preferences-hd" style={{"WebkitAppRegion": "drag"}}>
            <div className="preferences-title">
              <Toolbar style={{"padding": "0"}}>
                <IconButton component={Link} color="inherit" aria-label="Menu" to="/reader">
                  <BackIcon />
                </IconButton>
                <Typography variant="title" color="inherit" style={{marginLeft: '20px'}}>
                  <FormattedMessage id="preferences" defaultMessage="Preferences" />
                </Typography>
              </Toolbar>
            </div>
          </div>
          <div className="preferences-bd">
            <div className="general-container">
              <div>
                <span>
                  <FormattedMessage id="general" defaultMessage="General" />
                </span>
              </div>
              <Paper className="block-general">
                <Grid container>
                  <Grid item xs container alignItems="center">
                    <FormattedMessage id="selectedLanguage" defaultMessage="Selected Language" />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth >
                      <Select value={App.locale} onChange={ this.handleChangeLanguage }>
                        <MenuItem value='en-US'>English</MenuItem>
                        <MenuItem value='zh-CN'>简体中文</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Divider style={{margin: '15px 0'}} />
                <Grid container >
                  <Grid item xs container alignItems="center">
                    <FormattedMessage id="refreshSubscriptions" defaultMessage="Refresh Subscriptions" />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth >
                      <Select value={App.refresh}>
                        <MenuItem value="none">
                         <FormattedMessage id="neverNone" defaultMessage="Never None" />
                        </MenuItem>
                        <MenuItem value="start">
                          <FormattedMessage id="start" defaultMessage="Start" />
                        </MenuItem>
                        <MenuItem value={1}>
                          <FormattedMessage id="everyMinutes" defaultMessage="Every Minutes" />
                        </MenuItem>
                        <MenuItem value={5}>
                          <FormattedMessage id="fiveMinutes" defaultMessage="5 Minutes" />
                        </MenuItem>
                        <MenuItem value={15}>
                          <FormattedMessage id="fifteenMinutes" defaultMessage="15 Minutes" />
                        </MenuItem>
                        <MenuItem value={30}>
                          <FormattedMessage id="thirtyMinutes" defaultMessage="30 Minutes" />
                        </MenuItem>
                        <MenuItem value={60}>
                          <FormattedMessage id="everyHours" defaultMessage="Every Hours" />
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </div>
        </div>
      </BasicLayout>
    )
  }
}

const mapStateToProps = state => {
  const { App } = state
  return { App }
}


import './index.sass'
export default connect(mapStateToProps)(injectIntl(GeneralContainer))
