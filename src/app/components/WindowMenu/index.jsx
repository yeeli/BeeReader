import React, { Component } from 'react'
import { remote } from 'electron';

class WindowMenu extends Component {
  handleWindowClose = () => {
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
    const winStyle = { "WebkitAppRegion": "drag" }
    return (
      <div className="block-hd" style={winStyle}>
        <button id="btn-close" onClick={ this.handleWindowClose }>x</button>
        <button id="btn-min" onClick={ this.handleWindowMin }>-</button>
        <button id="btn-max" onClick={ this.handleWindowMax }>+</button>
      </div>
    )
  }
}

export default WindowMenu
