import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton';
import SyncIcon from '@material-ui/icons/Sync'
import AddIcon from '@material-ui/icons/Add'
import RssIcon from '@material-ui/icons/RssFeed'

class Streams extends Component {

  setStream = (stream) => {
    return (
      <ListItem button className="subscription-item" key={stream.id} onClick={(e) => { this.props.onClickStream(e, stream.id)}}>
        <ListItemIcon>
          <RssIcon  style={{ color: '#fff', fontSize: '15px', marginRight: 0}}/>
        </ListItemIcon>
        <ListItemText primary={stream.title} className="subscription-title" />
        { stream.entries_count > 0 && 
            (
              <ListItemSecondaryAction>
                <span className="subscription-count">{ stream.entries_count }</span>
              </ListItemSecondaryAction>
            )
        }
      </ListItem>
    )
  }

  listStreams = (streams) => {
    return streams.map( stream  => {
      return (
        <div key={ stream.id }>
          { this.setStream(stream) }
        </div>
      )
    }) 
  }

  listCategories = (categories) => {
    return categories.map(category => {
      return (
        <div key={category.id}>
          <ListItem button onClick={(e) =>{ this.props.onClickCategory(e, category.id)}} className="category-item" key={category.id}>
            {category.open ? <ExpandMore style={{color: "#fff"}} /> : <ChevronRight style={{color: "#fff"}}/>  }

            <ListItemText inset primary={category.title} className="category-title"/>
            { category.entries_count > 0 && 
                (
                  <ListItemSecondaryAction>
                    <span className="subscription-count">{category.entries_count}</span>
                  </ListItemSecondaryAction>
                )
            }
          </ListItem>
          <Collapse in={category.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              { category.streams.map(this.listStreams)}
            </List>
          </Collapse>
        </div>
      )
    })
  }

  render () {
    const winStyle = { "WebkitAppRegion": "drag" }
    const { streams, height } = this.props
    const nheight = height - 100
    return(
      <div className="block-subscriptions">
        <div className="block-hd" style={winStyle}></div>
        <div className="block-bd" style={{height: `${nheight}px`}}>
          <div className="account">
            <span>Rss</span>
          </div>
          <List>
            <ListItem button>
              <ListItemText primary="All" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Unread" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Today" />
            </ListItem>
          </List> 
          <List className="listing-subscriptions">
            {
              this.listStreams(streams) 
            }
          </List>
        </div>
        <div className="block-ft">
          <IconButton aria-label="sync" className="btn-sync" onClick={ this.props.onClickSync }>
            <SyncIcon />
          </IconButton>
          <IconButton aria-label="add" className="btn-add" onClick={ this.props.onClickNewStream }>
            <AddIcon />
          </IconButton>
        </div>
      </div>
    )
  }
}

Streams.propTypes = {
  height: PropTypes.number,
  subscriptions: PropTypes.array,
  onClickSubscription: PropTypes.func,
  onClickCategory: PropTypes.func,
  onClickSync: PropTypes.func,
}

import './index.sass'
export default Streams
