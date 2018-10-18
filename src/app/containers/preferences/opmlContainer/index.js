import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {injectIntl, FormattedMessage} from 'react-intl'
import { Link } from 'react-router-dom'
import { parseString } from 'xml2js'

// Material Ui

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/arrowBack'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'


// Fontawesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons'

// Layout

import BasicLayout from '~/layouts/basicLayout'

class OpmlContainer extends Component {
  state = {
    data: [],
    selectedSites: [],
  }


  constructor(props) {
    super(props)
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

  handleUploadOpml = event => {
    let reader = new FileReader()
    let file = event.target.files[0]
    if(file && file.name){
      reader.onloadend = () => {
        let result = reader.result
        if(result.match(/\<opml[^\>]*\>/)){
          parseString(result, (err, result) => {
            this.setState({data: result.opml.body[0]})
          })
        } else {
          console.log("reader error")
        }

      }
      reader.readAsText(file)
    }
  }

  renderItem = (subscription) => {
    return (
      <Grid item xs={6}>
        <Paper className="site-item" onClick={this.handleClickSite(subscription.xmlUrl)} color="#fff">
          <div className="site-action">
            {this.state.selectedSites.indexOf(subscription.xmlUrl) === -1 ?
                <FontAwesomeIcon icon={faCheckCircle} color="#999"/>
                :
                <FontAwesomeIcon icon={faCheckCircle} color="#2196f3"/>
            }

          </div>
          <div className="site-name">{subscription.title}</div>
          <div className="site-rss">{subscription.xmlUrl}</div>
        </Paper>
      </Grid>
    )
  }

  renderSubscription = (data) => {
    return  !_.isEmpty(data) && data.outline.map((item, index) => {
      let subscription = item.$
      if(item.outline){
        return (
          <div key={index}>
            <div>{subscription.title}</div>
            <Grid container  spacing={16} className="listing-sites">
              { item.outline.map((sitem, index) => {
                let sub = sitem.$
                return this.renderItem(sub)
              }) 
              }
            </Grid>
          </div>
        )
      } else {
        return (
          <Grid container  spacing={16} className="listing-sites" key={index}>
            {this.renderItem(subscription)}
          </Grid>
        )
      }
    })  
  }

  render() {
    const {data} = this.state
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
                  Import OPML
                </Typography>
              </Toolbar>
            </div>
          </div>
          <div className="preferences-bd">
            <div className="opml-upload-container">
              <div className="block-opml-upload" >
                <input id="contained-button-file" type="file" style={{ display: 'none'}}  onChange={ this.handleUploadOpml } />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span" color="primary">
                    Choice opml File
                  </Button>
                  <Typography variant="body1" style={{marginTop: '10px', color: '#A9A9A9'}}>Drap File Here</Typography>
                </label>
              </div>           
            </div>
            { !_.isEmpty(data) && (
              <div className="opml-text-container">
                <div>
                  <span>listing rss</span>
                </div>
                { this.renderSubscription(data) }
              </div>
            )
            }
          </div>
        </div>
      </BasicLayout>
    )
  }
}


import './index.sass'
export default injectIntl(OpmlContainer)
