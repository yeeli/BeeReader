import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import _ from 'lodash'

class Feeds extends Component {
  render() {
    const winStyle = { "WebkitAppRegion": "drag" }
    const { entries } = this.props
    return(
      <div className="block-feeds">
        <div className="block-hd" style={winStyle}>
        </div>
        <div className="block-bd">
          <List>
            { entries.map( (entry) => {
              return (
                <ListItem className="feed-item">
                  <ListItemText primary={entry.title} secondary={entry.summary.substr(0, 20)} className="feed-title"/>
                </ListItem> 
              )
            })}
          </List>
          {_.isEmpty(entries) && <div className="listing-feeds-blank"></div>}

        </div>
      </div>
    )
  }
}


import './index.sass'

export default Feeds
