import React, { Component } from 'react'
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

class Subscriptions extends Component {

  listSubscriptions = (subscription) => {
    return (
      <ListItem button className="subscription-item" key={subscription.id} onClick={(e) => { this.props.onClickSubscription(e, subscription.id)}}>
        <ListItemText inset primary={subscription.title} className="subscription-title" />
        { subscription.entries_count > 0 && 
            (
              <ListItemSecondaryAction>
                <span className="subscription-count">{subscription.entries_count}</span>
              </ListItemSecondaryAction>
            )
        }
      </ListItem>
    )
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
    const { categories, height } = this.props
    const nheight = height - 100
    return(
      <div className="block-subscriptions">
        <div className="block-hd" style={winStyle}></div>
        <div className="block-bd" style={{height: `${nheight}px`}}>
          <div className="account">
            <span>Feedly</span>
          </div>
          <List className="listing-subscriptions">
            { this.listCategories(categories) }
          </List>
        </div>
        <div className="block-ft">
          <IconButton aria-label="sync" className="btn-sync" onClick={ this.props.onClickSync}>
            <SyncIcon className="icon-spin" />
          </IconButton>
        </div>
      </div>
    )
  }
}

import './index.sass'
export default Subscriptions
