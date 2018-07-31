import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
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
import ToysIcon from '@material-ui/icons/Toys'
import InboxIcon from '@material-ui/icons/Inbox'
import AssessmentIcon from '@material-ui/icons/Assessment'
import TodayIcon from '@material-ui/icons/Today'

import { remote } from 'electron'
const RemoteMenu = remote.Menu
const RemoteMenuItem = remote.MenuItem

class Streams extends Component {

  constructor(props) {
    super(props)
  }

  rightMenu = (e, stream) => {
    e.preventDefault()
    const menu = new RemoteMenu()

    menu.append(new RemoteMenuItem({label: 'Edit', click: () => {}}))
    menu.append(new RemoteMenuItem({type: 'separator'}))
    menu.append(new RemoteMenuItem({label: `Unsubscribe from "${ stream.title }"`, click: () => {}}))
    menu.popup(remote.getCurrentWindow())
  }

  setStream = (stream, selected) => {
    return (
      <MenuItem selected={selected} className="subscription-item" key={stream.id} onClick={(e) => { this.props.onClickStream(e, stream.id)}} onContextMenu={ (e) => this.rightMenu(e, stream) }>
        <ListItemIcon>
          { stream.sync ? <ToysIcon style={{ color: '#fff', fontSize: '15px', marginRight: 0}}  className="icon-spin"/> : <RssIcon  style={{ color: '#fff', fontSize: '15px', marginRight: 0}}/> }
        </ListItemIcon>
        <ListItemText primary={stream.title} className="subscription-title" />
        { stream.entries_count > 0 && 
            (
              <ListItemSecondaryAction>
                <span className="subscription-count">{ stream.entries_count }</span>
              </ListItemSecondaryAction>
            )
        }
      </MenuItem>
    )
  }

  listStreams = (streams, selectedItem) => {
    return streams.map( stream  => {
      let selected = stream.id == selectedItem
      return (
        <div key={ stream.id }>
          { this.setStream(stream, selected) }
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
    const { streams, height, selectedItem } = this.props
    const nheight = height - 100
    return(
      <div className="block-subscriptions">
        <div className="block-hd" style={winStyle}></div>
        <div className="block-bd" style={{height: `${nheight}px`}}>
          <div className="account">
            <span>Rss</span>
          </div>
          <MenuList>
            <MenuItem selected={ selectedItem == "all"}>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="All" />
            </MenuItem>
            <MenuItem selected={ selectedItem == "unread"}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Unread" />
            </MenuItem>
            <MenuItem selected={ selectedItem == "today"}>
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary="Today" />
            </MenuItem>
          </MenuList> 
          <MenuList className="listing-subscriptions">
            {
              this.listStreams(streams, selectedItem) 
            }
          </MenuList>
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
