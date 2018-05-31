import React, { Component } from 'react'

class Entry extends Component {
  render() {
    const winStyle = { "WebkitAppRegion": "drag" }
    const { data } = this.props
    return(
      <div className="block-entry">
        <div className="block-hd" style={winStyle}>
        </div>
        <div className="block-bd">
          <div className="entry">
            <div className="entry-hd">{ data.title }</div>
            {<div dangerouslySetInnerHTML={{__html: data.content}} className="entry-content"></div> }
          </div>
        </div>
      </div>
    )
  }
}


import './index.sass'

export default Entry
