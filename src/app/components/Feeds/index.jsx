import React, { Component } from 'react'

class Feeds extends Component {
  render() {
    return(
      <div className="block-feeds">
        <div className="block-hd" style={{ "-webkit-app-region": "drag"}}>
        </div>
        <div className="block-bd">
          <div className="listing-feeds-blank"></div>
        </div>
      </div>
    )
  }
}


import './index.sass'
export default Feeds
