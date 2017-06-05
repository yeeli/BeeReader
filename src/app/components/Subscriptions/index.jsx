import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List'
import Toggle from 'material-ui/Toggle'

import { remote } from 'electron';


class Subscriptions extends Component {
  state = {
    open: false,
  };

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
  handleWindowMin = () => {
    const currentWin = remote.getCurrentWindow()
    currentWin.minimize(); 
  };

  handleWindowMax = () => {
    const currentWin = remote.getCurrentWindow()
    currentWin.maximize(); 
  };

  render () {
    return(
      <div className="block-subscriptions"> 
        <div className="block-hd" style={{ "-webkit-app-region": "drag"}}>
          <button id="btn-close">x</button>
          <button id="btn-min" onClick={ this.handleWindowMin }>-</button>
          <button id="btn-max" onClick={ this.handleWindowMax }>+</button>
        </div>
        <div className="block-bd">
          <List>
            <ListItem primaryText="Sent mail" />
            <ListItem primaryText="Drafts" />
            <ListItem
              primaryText="Inbox"
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="Starred"
                />,
                <ListItem
                  key={2}
                  primaryText="Sent Mail"
                  disabled={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="Drafts" />,
                  ]}
                />,
                <ListItem
                  key={3}
                  primaryText="Inbox"
                  open={this.state.open}
                  onNestedListToggle={this.handleNestedListToggle}
                  nestedItems={[
                    <ListItem key={1} primaryText="Drafts" />,
                  ]}
                />,
              ]}
            />
          </List>
        </div>
      </div>
    )
  }
}


import './index.sass'
export default Subscriptions
