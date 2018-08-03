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

class Subscriptions extends Component {

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

  setStream = (stream, selectedItem) => {
    let selected = stream.id == selectedItem.id && selectedItem.type == "stream"
    return (
      <MenuItem selected={selected} className="subscription-item" key={stream.id} onClick={ this.props.onFilter({ type: 'stream', id: stream.id}) } onContextMenu={ (e) => this.rightMenu(e, stream) }>
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

  setCategory = (category, selectedItem, opened) => {
    let selected = category.id == selectedItem.id && selectedItem.type == "category"
    let stream_ids = category.stream_ids.split(",")
    let streams = _.filter(this.props.streams.items, (stream) => { 
      return _.includes(stream_ids, stream.id.toString())
    })
    let cateOpened =  opened == 1 ? true : false
    return (
      <div key={category.id}>
        <MenuItem selected={selected} onClick={ this.props.onFilter({  type: 'category', id: category.id }) } className="category-item" key={category.id}>
          {cateOpened ? <ExpandMore  style={{ color: '#fff', fontSize: '15px', marginRight: 0}} /> : <ChevronRight style={{color: "#fff", fontSize: '15px', marginRight: 0}}/>  }
          <ListItemText inset primary={category.title} className="category-title"/>
          { category.entries_count > 0 && 
              (
                <ListItemSecondaryAction>
                  <span className="subscription-count">{category.entries_count}</span>
                </ListItemSecondaryAction>
              )
          }
        </MenuItem>
          <Collapse in={ cateOpened } timeout="auto" unmountOnExit >
            <MenuList disablePadding className="category-subscriptions">
              { streams.map((stream) => { return this.setStream(stream, selectedItem) }) }
            </MenuList>
          </Collapse>
      </div>
    )
  }


  listFolders = (selectedItem) => {
    const {items} = this.props.folders
    const streams = this.props.streams.items
    const categories = this.props.categories.items

    return items.map( folder => {
      let selected = folder.source_id == selectedItem
      if(folder.source_type === "Stream") {
        let stream = _.find(streams, {id: folder.source_id})
        return ( 
          <div key={folder.id}>
          { this.setStream(stream, selectedItem) }
        </div>
        )
      }
      if(folder.source_type === "Category") {
        let category = _.find(categories, {id: folder.source_id})
        return (
          <div key={folder.id}>
            { this.setCategory(category, selectedItem, folder.opened)  }
        </div>
        )
      }
    })
  }

  render () {
    const winStyle = { "WebkitAppRegion": "drag" }
    const { folders, categories, streams, height, selectedItem } = this.props

    const nheight = height - 100
    return(
      <div className="block-subscriptions">
        <div className="block-hd" style={winStyle}></div>
        <div className="block-bd" style={{height: `${nheight}px`}}>
          <div className="account">
            <span>Rss</span>
          </div>
          <MenuList className="listing-filters">
            <MenuItem selected={ selectedItem.type == "all"} onClick={ this.props.onFilter({  type: 'all' }) }>
              <ListItemIcon>
                <AssessmentIcon style={{color: '#fff', fontSize: '0.9rem', marginRight: 0 }} />
              </ListItemIcon>
              <ListItemText primary="All" className="filter-name"/>
            </MenuItem>
            <MenuItem selected={ selectedItem.type == "unread"} onClick={ this.props.onFilter({  type: 'unread' }) }>
              <ListItemIcon>
                <InboxIcon style={{color: '#fff', fontSize: '0.9rem', marginRight: 0 }} />
              </ListItemIcon>
              <ListItemText primary="Unread" className="filter-name" />
            </MenuItem>
            <MenuItem selected={ selectedItem.type == "today"} onClick={ this.props.onFilter({  type: 'today' }) }>
              <ListItemIcon>
                <TodayIcon style={{color: '#fff', fontSize: '0.9rem', marginRight: 0 }} />
              </ListItemIcon>
              <ListItemText primary="Today" className="filter-name" />
            </MenuItem>
          </MenuList> 
          <MenuList className="listing-subscriptions">
            {
              folders.isLoaded && categories.isLoaded && streams.isLoaded && this.listFolders(selectedItem) 
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

Subscriptions.propTypes = {
  height: PropTypes.number,
  onClickCategory: PropTypes.func,
  onClickSync: PropTypes.func,
}

import './index.sass'
export default Subscriptions
