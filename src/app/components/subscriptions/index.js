import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton';
import SyncIcon from '@material-ui/icons/Sync'
import AddIcon from '@material-ui/icons/Add'

class Subscriptions extends Component {

  setStream = (stream) => {
    return (
      <ListItem button className="subscription-item" key={stream.id} onClick={(e) => { this.props.onClickSubscription(e, stream.id)}}>
        <ListItemText inset primary={stream.title} className="subscription-title" />
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

  listSubscriptions = (subscriptions) => {
    return subscriptions.map( subscription  => {
      return (
        <div key={ subscription.id }>
          { this.setStream(subscription) }
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
              { category.subscriptions.map(this.listSubscriptions)}
            </List>
          </Collapse>
        </div>
      )
    })
  }

  render () {
    const winStyle = { "WebkitAppRegion": "drag" }
    const { subscriptions, height } = this.props
    const nheight = height - 100
    return(
      <div className="block-subscriptions">
        <div className="block-hd" style={winStyle}></div>
        <div className="block-bd" style={{height: `${nheight}px`}}>
          <div className="account">
            <span>Rss</span>
          </div>
          <List className="listing-subscriptions">
            {
               this.listSubscriptions(subscriptions) 
            }
          </List>
        </div>
        <div className="block-ft">
          <IconButton aria-label="sync" className="btn-sync" onClick={ this.props.onClickSync }>
            <SyncIcon />
          </IconButton>
          <IconButton aria-label="add" className="btn-add">
            <AddIcon />
          </IconButton>
        </div>
      </div>
    )
  }
}

Subscriptions.propTypes = {
  height: PropTypes.number,
  subscriptions: PropTypes.array,
  onClickSubscription: PropTypes.func,
  onClickCategory: PropTypes.func,
  onClickSync: PropTypes.func,
}

import './index.sass'
export default Subscriptions
