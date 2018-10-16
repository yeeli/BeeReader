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

// Layout

import BasicLayout from '~/layouts/basicLayout'

class OpmlContainer extends Component {
  state = {
    data: []
  }

  constructor(props) {
    super(props)
  }


  handleUploadOpml = event => {
    let reader = new FileReader()
    let file = event.target.files[0]
    if(file.name)
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

  renderSubscription = (data) => {
    return  !_.isEmpty(data) && data.outline.map((item, index) => {
      let subscription = item.$
      return (
        <div key={index}>{subscription.title}</div>
      )
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
            <div className="general-container">
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
            <div className="opml-text-container">
              { this.renderSubscription(data) }
            </div>
          </div>
        </div>
      </BasicLayout>
    )
  }
}


import './index.sass'
export default injectIntl(OpmlContainer)
