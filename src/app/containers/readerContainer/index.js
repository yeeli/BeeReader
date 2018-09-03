import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import CssBaseline from '@material-ui/core/CssBaseline'
import Snackbar from '@material-ui/core/Snackbar'

import SplitPane from 'react-split-pane'
import interact from 'interactjs'

// Components
import Subscriptions from '~/components/subscriptions'
import Feeds from '~/components/feeds'
import Content from '~/components/content'
import AddStreamDialog from '~/components/dialogs/addStream'
import SubscribeStreamDialog from '~/components/dialogs/subscribeStream'

// Actions
import  * as AppActions from '~/actions/app'
import  * as AccountsActions from '~/actions/accounts'
import  * as FoldersActions from '~/actions/folders'
import  * as CategoriesActions from '~/actions/categories'
import  * as StreamsActions from '~/actions/streams'
import  * as EntriesActions from '~/actions/entries'
import  * as DataActions from '~/actions/data'

import { Link } from 'react-router-dom'

class ReaderContainer extends Component {
  timer = null
  paneSubscriptionsRef = React.createRef()
  paneFeedsRef = React.createRef()
  paneContentRef = React.createRef()
  rssUrlRef = React.createRef()

  state = {
    browserHeight: window.outerHeight,
    browserWidth: document.body.scrollWidth,
    subscriptionsWidth: 250,
    feedsWidth: 320,
    contentWidth: 500,
    openNewStream: false,
    openSubscribeStream: false,
    tipsOpen: false,
    tipsMsg: '',
    subscribeRss: {}
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props 
    dispatch(AccountsActions.fetchAccounts()).then( res => {
      if(res.meta.status == "success"){
        if(!_.isEmpty(res.data.accounts)){
          let account = _.find(res.data.accounts, {service: 'Rss'})
          dispatch(AppActions.setCurrentAccount(account))
          dispatch(FoldersActions.fetchFolders(account))
          dispatch(CategoriesActions.fetchCategories(account))
          dispatch(StreamsActions.fetchStreams(account))
          dispatch(EntriesActions.fetchEntries(account))
        }
      }
    })

    window.addEventListener("resize", this.handleWindowResize)

    interact('.resize1').draggable({ onmove: window.dragMoveListener })
      .on('dragmove', self.handleResizeSubscriptions);

    interact('.resize2').draggable({ onmove: window.dragMoveListener})
      .on('dragmove', self.handleResizeFeeds);

    //Auto Sync Entries Now
    this.timer = setInterval(this.syncEntries, 60000 * 30)
  }


  syncEntries = () => {
    const {items} = this.props.Streams
    this.props.dispatch(AppActions.syncing())
    for(let stream of items) {
      this.props.dispatch(EntriesActions.syncEntries(stream.id))
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
      subscriptionsWidth: subscriptionsWidth,
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
    this.syncEntries()
  }

  handleClickNewStream = (event) => {
    this.setState({ openNewStream: true })
  }

  handleCloseNewStream = () => {
    this.setState({ openNewStream: false })
  }

  handleSearchStream = (event, value) => {
    this.props.dispatch(AppActions.fetchRss(value)).then(res => {
      if(res.meta.status == "success") {
        this.setState({ subscribeRss: res.data.rss, openNewStream: false, openSubscribeStream: true })
      } else {

      }
    })
  }

  handleCloseSubscribeStream = () => {
    this.setState({ openSubscribeStream: false })
  }

  handleSubscribeStream = (categories = []) => event => {
    const { feed_url } = this.state.subscribeRss
    this.props.dispatch(StreamsActions.addStream(feed_url, categories))
    this.setState({ openSubscribeStream: false, tipsOpen: true , tipsMsg: 'Subscribe Success' })
  }


  handleUnsubscribeStream = (id) => {
   this.props.dispatch(StreamsActions.destroyStream(id)) 
  }

  handleEditStream = (stream) => {
    this.setState({ openSubscribeStream: true })
  }

  handleNewFolder = name => event => {
    this.props.dispatch(CategoriesActions.addCategory(name))
  }

  handleFilter = selected => event => {
    let ids = []
    this.props.dispatch(DataActions.clearData())
    this.props.dispatch(AppActions.setSelectedStream(selected))
    this.props.dispatch(EntriesActions.filterEntries())
  }

  // Feed Events

  handleClickFeed = (event, id) => {
    this.props.dispatch(EntriesActions.readEntry(id))
    this.props.dispatch(DataActions.fetchData(id))
    this.props.dispatch(AppActions.setSelectedEntry(id))
  }

  handleClickMakeAllRead = (event) => {
    this.props.dispatch(StreamsActions.makeAllRead()) 
  }

  handleCloseContent = (event) => {
    this.props.dispatch(DataActions.clearData())
  }

  handleTipsClose = (event) => {
    this.setState({tipsOpen: false})
  }

  render () {
    const { synced, streamsList, entriesList, showEntry, browserHeight, subscriptionsWidth, feedsWidth, contentWidth } = this.state
    const { App, Folders, Entries, Data, Categories, Streams, Accounts } = this.props

    let dataContent = Data.item

    if(Data.isLoaded && !_.isNull(dataContent) && !_.isNull(App.selectedEntry)) {
      let entry = _.find(Entries.items, {id: App.selectedEntry})
      dataContent.stream_title = entry.stream_title
      dataContent.published_at = entry.published_at
    }

    return (
      <div id="reader">
        <CssBaseline />
        <div className="reader-container split-pane">
          <div className="pane pane-subscriptions" ref={ this.paneSubscriptionsRef } style={{flex: `0 0 ${subscriptionsWidth}px`}}>
            <Subscriptions  
              height={browserHeight} 
              folders={Folders}
              categories={Categories}
              streams= {Streams}
              app={App}
              selectedItem={ App.selectedStream }
              onFilter={ this.handleFilter } 
              onClickSync={ this.handleClickSync }  
              onClickNewStream={ this.handleClickNewStream } 
              onUnsubscribeStream={ this.handleUnsubscribeStream }
              onEditStream={ this.handleEditStream }
              syncing={ App.syncing }
            />
          </div>
          <div className="resizer vertical resize1"/>
          <div className="pane pane-feeds" ref={this.paneFeedsRef} style={{flex: `0 0 ${feedsWidth}px`}}>
            <Feeds 
              height={ browserHeight } 
              entries={ Entries.filterItems } 
              selectedItem={ App.selectedEntry }
              onClickFeed={ this.handleClickFeed }
              onMakeAllRead={ this.handleClickMakeAllRead }
            />
          </div>
          <div className="resizer vertical resize2" />
          <div className="pane pane-content" ref={this.paneContentRef}>
            { <Content data={Data} content={dataContent} height={ browserHeight } onClose={ this.handleCloseContent } /> }
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
          rss={this.state.subscribeRss}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal:  'center' }}
          open={ this.state.tipsOpen }
          onClose={this.handleTipsClose }
          style={{marginTop: '10px'}}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          autoHideDuration={1000}
          message={ <span id="message-id">{this.state.tipsMsg}</span> }
        />
      </div>
    )
  }
}

import './index.sass'

const mapStateToProps = state => {
  const { App, Folders, Categories, Streams, Entries, Data, Accounts } = state
  return { App, Folders, Categories, Streams, Entries, Data, Accounts }
}

export default connect(mapStateToProps)(ReaderContainer)
