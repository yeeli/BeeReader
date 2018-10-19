import React, { Component } from 'react'
import { connect } from 'react-redux'
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


// Actions
import * as AppActions from '~/actions/app'

class OpmlContainer extends Component {
  state = {
    data: [],
    selectedSites: [],
  }


  constructor(props) {
    super(props)
  }

  handleClickSite = (rss, parent) => (event) => {
    let sites = Array.from(this.state.selectedSites)
    if(parent){
      var index = _.findIndex(sites, (s) =>{ return s.title == parent.title && s.children })
      var children = Array.from(sites[index]["children"])
      var cindex = _.findIndex(children, {'rssUrl': rss.rssUrl})
      if(cindex != -1 ){
        _.pull(children, rss)
      } else {
        children.push(rss)
      }
      sites[index] = {title: parent.title, children: children} 
    } else {
      var index = _.findIndex(sites, {'rssUrl': rss.rssUrl})
      if(index != -1 ){
        _.pull(sites, rss)
      } else {
        sites.push(rss)
      }
    }
    this.setState({selectedSites: sites})
  }

  handleUploadOpml = event => {
    let that = this
    let reader = new FileReader()
    let file = event.target.files[0]
    if(file && file.name){
      reader.onloadend = () => {
        let result = reader.result
        if(result.match(/\<opml[^\>]*\>/)){
          parseString(result, (err, result) => {
            let  data = result.opml.body[0]
            let opmlData = data.outline.map((item) => {
              let sub = item.$
              if(!_.isEmpty(item.outline)) {
                let children = item.outline.map((sitem) => {
                  let ssub = sitem.$
                  return {title: ssub.title, rssUrl: ssub.xmlUrl }
                })
                return {title: sub.title, children: children}
              } else {
                return {title: sub.title, rssUrl: sub.xmlUrl }
              }
            })
            this.setState({ data: opmlData, selectedSites: opmlData })
          })
        } else {
          that.props.dispatch(AppActions.openTips("please select opml file"))
        }

      }
      reader.readAsText(file)
    }
  }

  renderItem = (index, subscription, parent) => {
    let selectedSites = parent ? _.find(this.state.selectedSites, (s) =>{return s.title == parent.title && s.children})["children"] : this.state.selectedSites 
    return (
      <Grid item xs={6} key={`${index}_${subscription.rssUrl}`}>
        <Paper className="site-item" onClick={this.handleClickSite(subscription, parent)} color="#fff">
          <div className="site-action">
            { _.findIndex(selectedSites, { "rssUrl": subscription.rssUrl }) === -1 ?
                <FontAwesomeIcon icon={faCheckCircle} color="#999"/>
                :
                <FontAwesomeIcon icon={faCheckCircle} color="#2196f3"/>
            }

          </div>
          <div className="site-name" title={ subscription.title }>{subscription.title}</div>
          <div className="site-rss" title={subscription.rssUrl }>{subscription.rssUrl}</div>
        </Paper>
      </Grid>
    )
  }

  renderSubscription = (data) => {
    return  data.map((subscription, index) => {
      if(subscription.children){
        return (
          <div key={index} className="group-subscription">
            <div className="folder-title">{subscription.title}</div>
            <Grid container  spacing={16} className="listing-sites">
              { subscription.children.map((sub, i) => {
                return this.renderItem(i, sub, subscription)
              }) 
              }
            </Grid>
          </div>
        )
      } else {
        return (
          <div key={index} className="group-subscription">
            <Grid container  spacing={16} className="listing-sites">
              {this.renderItem(index, subscription)}
            </Grid>
          </div>
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
              { !_.isEmpty(data) && (
                <div className="block-listing-opml">
                  <div className="block-hd">
                    <FormattedMessage id="opmlRss" defaultMessage="OPML RSS" />
                  </div>
                  <div className="block-bd">
                    { this.renderSubscription(data) }
                    <div className="opml-actions">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={ this.handleClickImport }
                      >
                        <FormattedMessage id="Import" defaultMessage="Import"/>
                      </Button>
                    </div>
                  </div>

                </div>
              )
              }
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
export default connect(mapStateToProps)(injectIntl(OpmlContainer))
