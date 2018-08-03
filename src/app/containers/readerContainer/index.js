import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import CssBaseline from '@material-ui/core/CssBaseline'

import SplitPane from 'react-split-pane'
import interact from 'interactjs'

// Components
import Subscriptions from '~/components/subscriptions'
import Feeds from '~/components/feeds'
import Content from '~/components/content'
import WindowMenu from '~/components/windowMenu'
import AddStreamDialog from '~/components/dialogs/addStream'
import SubscribeStreamDialog from '~/components/dialogs/subscribeStream'

// Actions
import  * as AppActions from '~/actions/app'
import  * as FoldersActions from '~/actions/folders'
import  * as CategoriesActions from '~/actions/categories'
import  * as StreamsActions from '~/actions/streams'
import  * as EntriesActions from '~/actions/entries'
import  * as DataActions from '~/actions/data'

import { Link } from 'react-router-dom'

class ReaderContainer extends Component {

  state = {
    browserHeight: window.outerHeight,
    browserWidth: document.body.scrollWidth,
    subscriptionsWidth: 250,
    feedsWidth: 320,
    contentWidth: 500,
    openNewStream: false,
    openSubscribeStream: false,
    selectedStream: { type: 'all' },
    selectedEntry: null
  }

  constructor(props) {
    super(props)
    this.rssUrlRef = React.createRef()
  }

  componentDidMount() {
    let self = this
    this.props.dispatch(FoldersActions.fetchFolders())
    this.props.dispatch(CategoriesActions.fetchCategories())
    this.props.dispatch(StreamsActions.fetchStreams())
    this.props.dispatch(EntriesActions.fetchEntries())

    window.addEventListener("resize", this.handleWindowResize)

    interact('.resize1').draggable({ onmove: window.dragMoveListener })
      .on('dragmove', self.handleResizeSubscriptions);

    interact('.resize2').draggable({ onmove: window.dragMoveListener})
      .on('dragmove', self.handleResizeFeeds);
  }

  componentDidUpdate(){
  }

  handleWindowResize = (event) => {
    let browserWidth = document.body.scrollWidth
    let browserHeight = window.outerHeight
    let { subscriptionsWidth, feedsWidth, contentWidth } = this.state
    if( browserWidth < (subscriptionsWidth + feedsWidth + 500)) {
      contentWidth = 500
      if(browserWidth - subscriptionsWidth - 500 > 250) {
        feedsWidth = browserWidth - subscriptionsWidth - 500
      } else {
        subscriptionsWidth = browserWidth - 750
      }
    } else {
      contentWidth = browserWidth - subscriptionsWidth - feedsWidth
    }
    this.setState({
      browserHeight: browserHeight, 
      browserWidth: browserWidth,  
      contentWidth: contentWidth, 
      feedsWidth: feedsWidth, 
      subscriptionsWidth: subscriptionsWidth  
    })
  }


  handleResizeSubscriptions = (event) => {
    var target = this.refs.paneSubscriptions;
    var split = event.target
    var x = (parseFloat(split.getAttribute('data-x')) || 0);

    // update the element's style
    var width = parseFloat(target.offsetWidth)
    width += event.dx;
    if( this.state.browserWidth - width - this.state.feedsWidth > 500) {
      this.setState({ subscriptionsWidth: width })
    }
  }

  handleResizeFeeds = (event) => {
    var target = this.refs.paneFeeds
    var split = event.target 
    var x = (parseFloat(split.getAttribute('data-x')) || 0)
    // update the element's style 
    var width = parseFloat(target.offsetWidth) 
    width += event.dx 
    if( this.state.browserWidth - width - this.state.subscriptionsWidth > 500) {
      this.setState({ feedsWidth: width })
    }
  }


  // Subscription Events

  handleClickSync = (event) =>  {
    const {items} = this.props.Streams
    for(let stream of items) {
      this.props.dispatch(EntriesActions.syncEntries(stream.id))
    }
  }

  handleClickNewStream = (event) => {
    this.setState({ openNewStream: true })
  }

  handleCloseNewStream = () => {
    this.setState({ openNewStream: false })
  }

  handleSearchStream = value => event => {
    this.props.dispatch(AppActions.fetchRss(value))
    this.setState({ openNewStream: false, openSubscribeStream: true })
  }

  handleCloseSubscribeStream = () => {
    this.setState({ openSubscribeStream: false })
  }

  handleSubscribeStream = (categories = []) => event => {
    const { feed_url } = this.props.App.subscribeRss
    this.props.dispatch(StreamsActions.addStream(feed_url, categories))
    this.setState({ openSubscribeStream: false })
  }

  handleUnsubscribeStream = (id) => event => {
  }

  handleNewFolder = name => event => {
    this.props.dispatch(CategoriesActions.addCategory(name))
  }

  handleFilter = selected => event => {
    let ids = []
    this.props.dispatch(DataActions.clearData())
    if(selected.type == 'stream') {
      ids = [selected.id]
    }
    if(selected.type == "category") {
      this.props.dispatch(FoldersActions.openFolder(selected))
      let category = _.find(this.props.Categories.items, { id: selected.id})
      ids = category.stream_ids.split(",").map( (id) => { return parseInt(id) })
    }
    this.props.dispatch(EntriesActions.filter(selected.type, ids))
    this.setState({ selectedStream: selected })
  }

  // Feed Events

  handleClickFeed = (event, id) => {
    this.props.dispatch(EntriesActions.readEntry(id))
    this.props.dispatch(DataActions.fetchData(id))
    this.setState({ selectedEntry: id })
  }

  render () {
    const { synced, streamsList, entriesList, showEntry, browserHeight, subscriptionsWidth, feedsWidth, contentWidth } = this.state
    const { App, Folders, Account, Entries, Data, Categories, Streams } = this.props
    let dataContent = Data.item

    if(Data.isLoaded && !_.isNull(dataContent) && !_.isNull(this.state.selectedEntry)) {
      let entry = _.find(Entries.items, {id: this.state.selectedEntry})
      dataContent.stream_title = entry.stream_title
      dataContent.published_at = entry.published_at
    }

    return (
      <div id="reader">
        <CssBaseline />
        <WindowMenu />
        <div className="reader-container split-pane">
          <div className="pane pane-subscriptions" ref="paneSubscriptions" style={{flex: `0 0 ${subscriptionsWidth}px`}}>
            <Subscriptions  
              height={browserHeight} 
              folders={Folders}
              categories={Categories}
              streams= {Streams}
              selectedItem={ this.state.selectedStream }
              onFilter={ this.handleFilter } 
              onClickSync={ this.handleClickSync }  
              onClickNewStream={ this.handleClickNewStream } 
            />
          </div>
          <div className="resizer vertical resize1"/>
          <div className="pane pane-feeds" ref="paneFeeds" style={{flex: `0 0 ${feedsWidth}px`}}>
            <Feeds 
              height={ browserHeight } 
              entries={ Entries.filterItems } 
              selectedItem={ this.state.selectedEntry }
              clickFeed={ this.handleClickFeed }
            />
          </div>
          <div className="resizer vertical resize2" />
          <div className="pane pane-content" ref="paneContent">
            { Data.isLoaded && <Content data={dataContent} height={ browserHeight } /> }
          </div>
        </div>
        <AddStreamDialog 
          open={ this.state.openNewStream } 
          onClose={ this.handleCloseNewStream } 
          onSearch={ this.handleSearchStream } 
        />
        <SubscribeStreamDialog 
          open={ this.state.openSubscribeStream } 
          onClose={ this.handleCloseSubscribeStream } 
          onSubscribe = { this.handleSubscribeStream }
          onNewFolder = { this.handleNewFolder }
          categories = {Categories.items} 
          rss={App.subscribeRss}
        />
      </div>
    )
  }
}

import './index.sass'

const mapStateToProps = state => {
  const { App, Folders, Categories, Streams, Entries, Data } = state
  return { App, Folders, Categories, Streams, Entries, Data }
}

export default connect(mapStateToProps)(ReaderContainer)
