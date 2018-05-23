import React, { Component } from 'react'
import {List, ListItem} from '@material-ui/core/List'
import WindowMenu from 'components/WindowMenu'

class Subscriptions extends Component {

  state = {
    open: false,
  };
  /*
  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  listSubscriptions = (items) => {
    return items.map( item => (
      <ListItem
        key={`sub-${item._id}`}
        primaryText={item.title}
      />
    ))
  }

  listCategories = (subscriptions) => {
    return subscriptions.map(item => {
      return (
        <ListItem
          primaryText={item.label}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          key={`cate-${item._id}`}
          nestedItems={this.listSubscriptions(item.subscriptions)}
        />
      )
    })
  };
  */
  render () {
    const {subscriptions} = this.props

    return(
      <div className="block-subscriptions">
        <WindowMenu />
        <div className="block-bd">
          { /*<List>
            {this.listCategories(subscriptions)}
          </List>
          */
          }
        </div>
      </div>
    )
    }
}

import './index.sass'
export default Subscriptions
