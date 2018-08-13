import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import Button from '@material-ui/core/Button'
import _ from 'lodash'
import QRCode from 'qrcode.react'

class Content extends Component {
  entryRef = React.createRef()
  webviewRef = React.createRef()

  state = {
    showData: null,
    open: false,
    webLoading: false
  }

  constructor(props) {
    super(props)
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
  componentDidUpdate() {
    let that = this
    if(this.state.showData){
      let webview = document.querySelector('webview')
      webview.addEventListener('dom-ready', () => {
        that.setState({webLoading: false})
      })
    }
  }

  handleClickEvent = (event, url) => {
    this.setState({showData: url, webLoading: true})
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
          <div>{ this.state.webLoading && "loading" }</div>
          <div className="content-actions">
            <Button onClick={this.handleOpen}>share</Button>
          </div>
        </div>
        <div className="block-bd" ref={this.entryRef} style={{height: `${nheight}px`}}>
          { this.state.showData && <webview src={this.state.showData} style={{ height: "100%" }} ref={this.webviewRef}></webview> }
          { data && ( !this.state.showData && this.renderEntry(data))}
          <div className="entry-qrcode-modal"
            onClick={this.handleClose}
            style={{display: `${ this.state.open ? 'block' : 'none' }`}}
          >
            <div className="entry-qrcode-body" style={{ marginTop: `${nheight / 2}px`} }>
              { data && <QRCode value={ data.url } size={250} /> }
            </div>
          </div>

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
