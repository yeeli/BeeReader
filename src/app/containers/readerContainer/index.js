import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import CssBaseline from '@material-ui/core/CssBaseline'

import SplitPane from 'react-split-pane'
import interact from 'interactjs'

// Components
import Streams from '~/components/streams'
import Feeds from '~/components/feeds'
import Entry from '~/components/entry'
import WindowMenu from '~/components/WindowMenu'
import AddStreamDialog from '~/components/dialogs/addStream'
import SubscribeStreamDialog from '~/components/dialogs/subscribeStream'

// Actions
import  * as AppActions from '~/actions/app'
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
    streamsList : [], 
    entriesList: [],
    openNewStream: false,
    openSubscribeStream: false,
    selectedStream: 'all',
    selectedEntry: null
  }

  constructor(props) {
    super(props)
    this.rssUrlRef = React.createRef()
  }

  componentDidMount() {
    let self = this
    this.props.dispatch(CategoriesActions.fetchCategories())
    this.props.dispatch(StreamsActions.fetchStreams())
    this.props.dispatch(EntriesActions.fetchEntries())

    window.addEventListener("resize", this.handleWindowResize.bind(this))

    interact('.resize1').draggable({ onmove: window.dragMoveListener })
      .on('dragmove', self.handleResizeSubscriptions);

    interact('.resize2').draggable({ onmove: window.dragMoveListener})
      .on('dragmove', self.handleResizeFeeds);
  }

  componentDidUpdate(){
    const { Categories, Streams,  Entries } = this.props
    const streams = Streams.items

    if(Entries.isLoaded && !this.state.synced ) {
      /*let streamsList = Categories.items.map(category => {
        let subs = []
        if(!_.isNil(category.stream_ids)) {
          subs = category.stream_ids.split(",").map( stream => {
            let index = _.findIndex(subscriptions, (s) => { return stream == s.id.toString() })
            if(index != -1) {
              return subscriptions[index]
            }
          })
        }
        return {...category, streams: streams, open: false}
      })
        */
      this.setState({
        entriesList: Entries.items,
        streamsList: streams,
        synced: true
      })
    }
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

  handleSearchStream = (event, value) => {
    this.props.dispatch(AppActions.fetchRss(value))
    this.setState({ openNewStream: false, openSubscribeStream: true })
  }

  handleCloseSubscribeStream = () => {
    this.setState({ openSubscribeStream: false })
  }

  handleSubscribeStream = (event, categories = []) => {
    const { feed_url } = this.props.App.subscribeRss
    this.props.dispatch(StreamsActions.addStream(feed_url))
    this.setState({ openSubscribeStream: false })
  }

  handleNewFolder = (event, name) => {
    this.props.dispatch(CategoriesActions.addCategory(name))
  }

  handleClickCategory = (event, id) => {
    let entries = []
    let changeStreams = this.state.streamsList.map((category) => {
      if(category.id == id) {
        if (category.open) {
          entries = _.takeWhile(this.props.Entries.items, (o) => { return _.includes(category.stream_ids.split(","), o.stream_id) })
          return {...category, open: false}
        } else {
          return {...category, open: true}
        }
      } else {
        return category
      }
    })
    this.setState({streamsList: changeStreams, entriesList: entries })
  }


  handleClickStream = (event, id) => {
    let entries = []
    for(let entry of this.props.Entries.items){ 
      if(id === entry.stream_id) {
        entries.push(entry)
      }
    }
    
    this.props.dispatch(DataActions.clearData())
    this.setState({entriesList: entries, selectedStream: id})
  }

  // Feed Events

  handleClickFeed = (event, id) => {
    this.props.dispatch(DataActions.fetchData(id))
    this.setState({ selectedEntry: id })
  }


  render () {
    const { synced, streamsList, entriesList, showEntry, browserHeight, subscriptionsWidth, feedsWidth, contentWidth } = this.state
    const { App, Account, Entries, Data, Categories } = this.props
    let entries = []

    return (
      <div id="reader">
        <CssBaseline />
        <WindowMenu />
        <div className="reader-container split-pane">
          <div className="pane pane-subscriptions" ref="paneSubscriptions" style={{flex: `0 0 ${subscriptionsWidth}px`}}>
            <Streams  
              height={browserHeight} 
              streams={ streamsList }
              selectedItem={ this.state.selectedStream }
              onClickStream={ this.handleClickStream } 
              onClickCategory={ this.handleClickCategory }  
              onClickSync={ this.handleClickSync }  
              onClickNewStream={ this.handleClickNewStream } 
            />
          </div>
          <div className="resizer vertical resize1"/>
          <div className="pane pane-feeds" ref="paneFeeds" style={{flex: `0 0 ${feedsWidth}px`}}>
            <Feeds 
              height={ browserHeight } 
              entries={ Entries.items } 
              selectedItem={ this.state.selectedEntry }
              clickFeed={ this.handleClickFeed }
            />
          </div>
          <div className="resizer vertical resize2" />
          <div className="pane pane-content" ref="paneContent">
            { Data.isLoaded && <Entry data={Data.item} /> }
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
  const { App, Categories, Streams, Entries, Data } = state
  return { App, Categories, Streams, Entries, Data }
}

export default connect(mapStateToProps)(ReaderContainer)
