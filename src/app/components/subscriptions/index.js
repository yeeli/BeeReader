import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse'
import WindowMenu from 'components/WindowMenu'

class Subscriptions extends Component {

  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  listSubscriptions = (subscription) => {
    return (
      <ListItem button className="subscription-item" key={subscription.id}>
        <ListItemText inset primary={subscription.title} className="subscription-title" />
      </ListItem>
    )
  }

  listCategories = (categories) => {
    return categories.map(category => {
      return (
        <div>
          <ListItem button onClick={this.handleClick} className="category-item" key={category.id}>
            {this.state.open ? <ExpandMore style={{color: "#fff"}} /> : <ChevronRight style={{color: "#fff"}}/>  }
            <ListItemText inset primary={category.title} className="category-title"/>
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              { category.subscriptions.map(this.listSubscriptions)}
            </List>
          </Collapse>
        </div>
      )
    })
  }

  render () {
    const { categories } = this.props

    return(
      <div className="block-subscriptions">
        <WindowMenu />
        <div className="block-bd">
          <List>
            { this.listCategories(categories) }
          </List>
        </div>
      </div>
    )
  }
}

import './index.sass'
export default Subscriptions
