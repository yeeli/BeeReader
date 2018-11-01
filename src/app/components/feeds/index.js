import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import DoneAllIcon from '@material-ui/icons/DoneAll'

import _ from 'lodash'
import moment from 'moment'
import PerfectScrollbar from 'react-perfect-scrollbar'

import {injectIntl, FormattedMessage} from 'react-intl'

import { remote } from 'electron'
const RemoteMenu = remote.Menu
const RemoteMenuItem = remote.MenuItem

class Feeds extends Component {

  rightMenu = (entry) => event => {
    event.preventDefault()
    const menu = new RemoteMenu()

    if(_.isNil(entry.read_at)) {
      menu.append(new RemoteMenuItem({label: 'Make as Read', click: () => {}}))
    } else {
      menu.append(new RemoteMenuItem({label: 'Make as Unread', click: () => {}}))
    }
    menu.append(new RemoteMenuItem({type: 'separator'}))
    menu.popup(remote.getCurrentWindow())
  }

  renderBlank(height) {
    return (
      <div className="listing-feeds-blank" style={{height: `${height - 40}px`}}>
      </div>
    )
  }

  render() {
    const winStyle = { "WebkitAppRegion": "drag" }
    const { entries, selectedItem,  onClickFeed, height, onMakeAllRead } = this.props
    const entries_count = entries.length
    const nheight = height - 50
    return(
      <div className="block-feeds">
        <div className="block-hd" style={winStyle}>
          { entries_count > 0 &&
            <div>
              <div className="left-actions">
                <IconButton disableRipple className='content-button' onClick={ onMakeAllRead }><DoneAllIcon /></IconButton>
              </div>
              <div className="entries-title">
                <FormattedMessage id="articlesCount" defaultMessage="{count} Articles" values={{ count: entries_count }} />
              </div>
            </div>
          }
        </div>
        <div className="block-bd" style={{height: `${nheight}px`}}>
          <PerfectScrollbar>
            <List className="listing-feeds">
              { entries.map( (entry) => {
                let date = new Date(entry.published_at)
                return (
                  <ListItem  key={entry.id} button className={`feed-item ${selectedItem == entry.id && 'item-selected'} ${ !_.isNull(entry.read_at) && 'read'}`} onClick={(e) => { onClickFeed(e, entry.id) }} onContextMenu={ this.rightMenu(entry) }>
                    <div className="feed-info">
                      <span className="feed-stream">{ entry.stream_title }</span>
                      <span className="feed-date">{ moment(date).format('YYYY-MM-D HH:mm') }</span>
                    </div>
                    <div className="feed-detail">
                      <h3 className="feed-title">{entry.title}</h3> 
                      <p className="feed-summary">{entry.summary && entry.summary.substr(0, 80)}</p>
                    </div>
                  </ListItem> 
                )
              })}
            </List>
          </PerfectScrollbar>
          {_.isEmpty(entries) && this.renderBlank(nheight) }
        </div>
        {/*<div className="block-ft">footer</div>*/}
      </div>
    )
  }
}

Feeds.propTypes = {
  height: PropTypes.number,
  entries: PropTypes.array,
  onClickFeed: PropTypes.func
}


import './index.sass'

export default injectIntl(Feeds)
