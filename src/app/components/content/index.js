import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import _ from 'lodash'

class Content extends Component {
  entryRef = React.createRef()

  state = {
    showData: null
  }

  transform = (node, index) => {
    if (node.type === 'tag' && node.name === 'img' ) {
      return React.createElement('img', {src: node.attribs.src, key: Math.random()})
    } 
    else if (node.type == "tag" && node.name == "a") {
      _.unset(node.attribs, 'class')
      _.unset(node.attribs, 'classname')
      _.unset(node.attribs, 'style')
      let children = null
      children = processNodes(node.children, this.transform);
      return React.createElement('a', {onClick: (event) => { this.handleClickEvent(event, node.attribs.href)}, href: 'javascript:;', key: Math.random()}, children)
    }
    else if(node.type === 'tag' && _.hasIn(node.attribs, 'class')) {
      _.unset(node.attribs, 'class')
      _.unset(node.attribs, 'classname')
      _.unset(node.attribs, 'style')
      return convertNodeToElement(node, index, this.transform)
    }
  }
  componentWillReceiveProps() {
    this.setState({ showData: null })
  }

  componentWillUpdate() {
    if(this.props.changeContent){
      this.entryRef.current.scrollTop = 0
    }
  }

  handleClickEvent = (event, url) => {
    this.setState({showData: url})
  }
  renderEntry(data) {
    let date = new Date(data.published_at)
    return (
      <div className="entry">
        <div className="entry-hd">
          <div className="entry-title">
            <a href='javascript:;' onClick={ (event) => { this.handleClickEvent(event, data.url) } }>
              { data.title }
            </a>
          </div>
          <div className="entry-info">
            <span>{ data.stream_title }</span>
            <span className="dot">&nbsp;•&nbsp;</span>
            <span>{ data.author }</span>
            <span className="dot">&nbsp;•&nbsp;</span>
            <span>{ date.toDateString()  }</span>
          </div>
        </div>
        <div className="entry-bd">
          { data.content && ReactHtmlParser(data.content, { transform: this.transform }) }
        </div>
      </div>
    )
  }
  render() {
    const winStyle = { "WebkitAppRegion": "drag" }
    const { data, height } = this.props
    const nheight = height - 50

    return(
      <div className="block-entry">
        <div className="block-hd" style={winStyle}>
        </div>
        <div className="block-bd" ref={this.entryRef} style={{height: `${nheight}px`}}>
          { this.state.showData && <webview src={this.state.showData} style={{ height: "100%" }}></webview> }
          { data && ( !this.state.showData && this.renderEntry(data))}
        </div>
      </div>
    )
  }
}

Content.propTypes = {
  data: PropTypes.object
}


import './index.sass'

export default Content
