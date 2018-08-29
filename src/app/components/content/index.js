import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import ClearIcon from '@material-ui/icons/Clear'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import _ from 'lodash'
import QRCode from 'qrcode.react'
import moment from 'moment'

class Content extends Component {
  entryRef = React.createRef()
  webviewRef = React.createRef()
  timer = null

  state = {
    showData: null,
    open: false,
    webLoading: 0,
    showLoading: false
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
    else if(node.type === 'tag' && node.name === 'iframe') {
      _.unset(node.attribs, 'class')
      _.unset(node.attribs, 'classname')
      _.unset(node.attribs, 'style')
      _.unset(node.attribs, 'width')
      _.unset(node.attribs, 'height')
      _.unset(node.attribs, 'allowfullscreen')
      return convertNodeToElement(node, index, this.transform)
    }
    else if(node.type === 'tag' && _.hasIn(node.attribs, 'class')) {
      _.unset(node.attribs, 'class')
      _.unset(node.attribs, 'classname')
      _.unset(node.attribs, 'style')
      _.unset(node.attribs, 'width')
      return convertNodeToElement(node, index, this.transform)
    }
  }

  componentWillUpdate() {
    if(this.props.changeContent){
      this.entryRef.current.scrollTop = 0
    }  
    if(this.props.data.isFetching && this.state.showData){
      this.setState({showData: null})
    }
  }
  componentDidUpdate() {
    let that = this
    if(this.props.data.isLoaded && this.state.showData){
      let webview = document.querySelector('webview')
      webview.addEventListener('dom-ready', () => {
        that.setState({ webLoading: 100 })
      })
      if (this.state.showLoading == false) {
        clearInterval(this.timer)
      }
    }
  }

  progress = () => {
    const { webLoading } = this.state;
    if (webLoading === 100) {
      this.setState({showLoading: false})
    } else {
      const diff = Math.random() * 10;
      this.setState({ webLoading: Math.min(webLoading + diff, 100) });
    } 
  };

  handleClickEvent = (event, url) => {
    this.timer = setInterval(this.progress, 500);
    this.setState({showData: url, webLoading: 0, showLoading: true})
  }

  handleQrOpen = () => {
    this.setState({ open: true });
  };

  handleQrClose = () => {
    this.setState({ open: false });
  };

  handleClose = (event) => {
    this.setState({ showData: null})
    this.props.onClose(event)
  }

  renderEntry(data) {
    let date = new Date(data.published_at)
    return (
      <div className="entry" id="entry_content">
        <div className="entry-hd">
          <div className="entry-title">
            <a href='javascript:;' onClick={ (event) => { this.handleClickEvent(event, data.url) } }>
              { data.title }
            </a>
          </div>
          <div className="entry-info">
            <span>{ data.stream_title }</span>
            <span className="dot">&nbsp;•&nbsp;</span>
            {data.author && <span>{ data.author }</span> }
            {data.author && <span className="dot">&nbsp;•&nbsp;</span> }
            <span>{  moment(date).format('YYYY-MM-D HH:mm') }</span>
          </div>
        </div>
        <div className="entry-bd">
          { data.content && ReactHtmlParser(data.content, { transform: this.transform }) }
        </div>
      </div>
    )
  }

  renderContent() {
    const { content, height, classes } = this.props
    const nheight = height - 50
    return (
      <div className="block-bd" ref={this.entryRef} style={{height: `${nheight}px`}}>
        { this.state.showData && this.state.showLoading && <LinearProgress variant="determinate" value={this.state.webLoading} /> }
        { this.state.showData && <webview src={this.state.showData} style={{ height: "100%" }} ref={this.webviewRef}></webview> }
        { content && ( !this.state.showData && this.renderEntry(content))}
        <div className="entry-qrcode-modal"
          onClick={this.handleQrClose}
          style={{display: `${ this.state.open ? 'block' : 'none' }`}}
        >
          <div className="entry-qrcode-body" style={{ marginTop: `${nheight / 2}px`} }>
            { content && <QRCode value={ content.url } size={250} /> }
          </div>
        </div>
      </div>

    )
  }
  render() {
    const winStyle = { "WebkitAppRegion": "drag" }
    const { data } = this.props
    return(
      <div className="block-entry">
        <div className="block-hd" style={winStyle}>
          <div className="content-actions">
            { data.isLoaded && (
              <div>
                <div className="left-actions">
                  <IconButton disableRipple className={'content-button'} onClick={this.handleClose}><ClearIcon /></IconButton>
                </div>
                <div className="right-actions">
                  <IconButton disableRipple className={'content-button'} onClick={this.handleQrOpen}><MoreVertIcon /></IconButton>
                </div>
              </div>
            )}
          </div>
        </div>
        { data.isLoaded && this.renderContent() }
      </div>
    )
  }
}

Content.propTypes = {
  content: PropTypes.object
}


import './index.sass'

export default Content
