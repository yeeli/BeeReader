import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CssBaseline from '@material-ui/core/CssBaseline'
import BackIcon from '@material-ui/icons/arrowBack'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl';
import {injectIntl, FormattedMessage} from 'react-intl'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'

class GeneralContainer extends Component {
  handleBackReader = () => {

  }

  render() {
    return (
      <div id="preferences">
        <CssBaseline />
        <AppBar position="static" color="default" style={{"WebkitAppRegion": "drag", 'paddingTop': '15px', backgroundColor: '#fff'}}>
          <Toolbar>
            <IconButton component={Link} color="inherit" aria-label="Menu" to="/reader">
              <BackIcon />
            </IconButton>
            <Typography variant="title" color="inherit" style={{marginLeft: '20px'}}>
              Preferences
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="general-container">
          <div><span>General</span></div>
          <Paper className="block-general">
            <Grid container>
              <Grid item xs container alignItems="center">
                Selected Language
              </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth >
                    <Select>
                      <MenuItem value='en'>English</MenuItem>
                      <MenuItem value='zh_cn'>中文</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>
            </Grid>
            <Divider style={{margin: '15px 0'}} />
            <Grid container >
              <Grid item xs container alignItems="center">
                Refresh Subscriptions
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth >
                  <Select>
                    <MenuItem value="">Never None</MenuItem>
                    <MenuItem value={10}>Start</MenuItem>
                    <MenuItem value={20}>Every Minutesy</MenuItem>
                    <MenuItem value={30}>5 Minutes</MenuItem>
                    <MenuItem value={30}>15 Minutes</MenuItem>
                    <MenuItem value={30}>30 Minutes</MenuItem>
                    <MenuItem value={30}>Every Hours</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    )
  }
}

import './index.sass'
export default injectIntl(GeneralContainer)
