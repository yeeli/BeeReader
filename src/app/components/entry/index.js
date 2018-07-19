import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'

class Entry extends Component {
  transform = (node) => {
    if (node.type === 'tag' && node.name === 'img' ) {
      console.log(node)
      return <img src={ node.attribs.src } />
    }
  }
  render() {
    const winStyle = { "WebkitAppRegion": "drag" }
    const { data } = this.props
    return(
      <div className="block-entry">
        <div className="block-hd" style={winStyle}>
        </div>
        <div className="block-bd">
          <div className="entry">
            <div className="entry-hd">
              <div className="entry-title"><h3>{ data.title }</h3></div>
              <div className="entry-info">
              </div>
            </div>
            <div className="entry-bd">
              { data.content && ReactHtmlParser(data.content, { transform: this.transform }) }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Entry.propTypes = {
  data: PropTypes.object
}


import './index.sass'

export default Entry
