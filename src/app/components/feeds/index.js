import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import _ from 'lodash'
import moment from 'moment'

class Feeds extends Component {
  render() {
    const winStyle = { "WebkitAppRegion": "drag" }
    const { entries, selectedItem,  clickFeed, height } = this.props
    const nheight = height - 50
    return(
      <div className="block-feeds">
        <div className="block-hd" style={winStyle}></div>
        <div className="block-bd" style={{height: `${nheight}px`}}>
          <List className="listing-feeds">
            { entries.map( (entry) => {
              let date = new Date(entry.published_at)
              return (
                <ListItem  key={entry.id} button className={`feed-item ${selectedItem == entry.id && 'item-selected'} ${ !_.isNull(entry.read_at) && 'read'}`} onClick={(e) => { clickFeed(e, entry.id) }}>
                  <div className="feed-info">
                    <span className="feed-stream">{ entry.stream_title }</span>
                    <span className="feed-date">{ moment(date).format('YYYY-MM-D hh:mm') }</span>
                  </div>
                  <div className="feed-detail">
                    <h3 className="feed-title">{entry.title}</h3> 
                    <p className="feed-summary">{entry.summary.substr(0, 80)}</p>
                  </div>
                </ListItem> 
              )
            })}
          </List>
          {_.isEmpty(entries) && <div className="listing-feeds-blank" style={{height: `${nheight - 40}px`}}></div>}
        </div>
        {/*<div className="block-ft">footer</div>*/}
      </div>
    )
  }
}

Feeds.propTypes = {
  height: PropTypes.number,
  entries: PropTypes.array,
  clickFeed: PropTypes.func
}


import './index.sass'

export default Feeds
