import React, { Component } from 'react'
import { remote } from 'electron';

import CircleIcon from '@material-ui/icons/FiberManualRecord'

let currentWin = remote.getCurrentWindow()

class WindowMenu extends Component {
  state = {
    focus: true,
    hover: false
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let that = this
    currentWin.on('blur', (e) => {
      that.setState({focus: false})
    })

    currentWin.on('focus', (e) => {
      that.setState({focus: true})
    })
  }

  handleWindowClose = () => {
  }

  handleWindowMin = () => {
    currentWin.minimize();
  }

  handleWindowMax = () => {
    currentWin.maximize();
  }

  handleHoverMenu = () => {
    this.setState({hover: true})
  }

  render () {
    return (
      <div className="block-win-menu" onMouseOver={this.handleHoverMenu}>
        <a href="javscript:;" onClick={ this.handleWindowClose }> 
          { this.state.hvoer 
            ?
             <CircleIcon style={{color: `${ this.state.focus ? '#DD7463' : '#ccc'  }`, fontSize: '18px'}}/>
            :
             <CircleIcon style={{color: `${ this.state.focus ? '#DD7463' : '#ccc'  }`, fontSize: '18px'}}/>
          }
        </a>
        <a href="javascript:;" onClick={ this.handleWindowMin }><CircleIcon style={{color: `${ this.state.focus ? '#EDC262' : '#ccc' }` , fontSize: '18px'}}/></a>
        <a href="javascript:;" onClick={ this.handleWindowMax }><CircleIcon style={{color: `${ this.state.focus ? '#7CC363' : '#ccc' }` , fontSize: '18px'}}/></a>
      </div>
    )
  }
}


import './index.sass'

export default WindowMenu
