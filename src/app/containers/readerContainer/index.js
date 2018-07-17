import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import SplitPane from 'react-split-pane'
import interact from 'interactjs'

// Components
import Subscriptions from '~/components/subscriptions'
import Feeds from '~/components/feeds'
import Entry from '~/components/entry'
import WindowMenu from '~/components/WindowMenu'

// Actions
import  * as AppActions from '~/actions/app'
import  * as CategoriesActions from '~/actions/categories'
import  * as StreamsActions from '~/actions/streams'
import  * as EntriesActions from '~/actions/entries'
import  * as DatasActions from '~/actions/datas'


import { Link } from 'react-router-dom'

class ReaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionsList : [], 
      entriesList: [],
      synced: false, 
      showEntry: null, 
      browserHeight: document.body.scrollHeight,
      browserWidth: document.body.scrollWidth,
      subscriptionsWidth: 250,
      feedsWidth: 250,
      contentWidth: 500

    }
  }
  componentDidMount() {
    let self = this
    this.props.dispatch(CategoriesActions.fetchCategories())
    this.props.dispatch(StreamsActions.fetchStreams())
    this.props.dispatch(EntriesActions.fetchEntries())
    this.props.dispatch(DatasActions.fetchDatas())

    window.addEventListener("resize", this.handleWindowResize.bind(this))

    interact('.resize1').draggable({ onmove: window.dragMoveListener })
      .on('dragmove', self.handleResizeSubscriptions);

    interact('.resize2').draggable({ onmove: window.dragMoveListener})
      .on('dragmove', self.handleResizeFeeds);
  }

  componentDidUpdate(){
    const { Categories, Streams,  Entries } = this.props
    const subscriptions = Streams.items

    if(Categories.isLoaded && Streams.isLoaded && Entries.isLoaded && !this.state.synced ) {
      let subscriptionsList = Categories.items.map(category => {
        let subs = []
        if(!_.isNil(category.stream_ids)) {
          subs = category.stream_ids.split(",").map( stream => {
          let index = _.findIndex(subscriptions, (s) => { return stream == s.id.toString() })
            if(index != -1) {
              return subscriptions[index]
            }
          })
        }
        return {...category, subscriptions: subscriptions, open: false}
      })
      this.setState({
        entriesList: Entries.items,
        subscriptionsList: subscriptions,
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
    let browserHeight = document.body.scrollHeight
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

  handleSync = (event) =>  {
    this.props.dispatch(AppActions.syncEntries())
  }

  handleClickCategory = (event, id) => {
    let entries = []
    let changeSubscriptions = this.state.subscriptionsList.map((category) => {
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
    this.setState({subscriptionsList: changeSubscriptions, entriesList: entries })
  }


  handleClickSubscription = (event, id) => {
    let entries = _.takeWhile(this.props.Entries.items, (o) => { return _.includes([id], o.stream_id)})
    this.setState({entriesList: entries})
  }

  // Feed Events

  handleClickFeed = (event, id) => {
    this.setState({showEntry: id})
  }

  render () {
    const { synced, subscriptionsList, entriesList, showEntry, browserHeight, subscriptionsWidth, feedsWidth, contentWidth } = this.state
    const { Account, Entries, Datas } = this.props
    let entries = []
    let data = {}
    if(!_.isNil(showEntry)) {
      data = Datas.items[showEntry]
    }

    return (
      <div id="reader">
        <WindowMenu />
        <div className="reader-container split-pane">
          <div className="pane pane-subscriptions" ref="paneSubscriptions" style={{flex: `0 0 ${subscriptionsWidth}px`}}>
            <Subscriptions  
              height={browserHeight} 
              subscriptions={ subscriptionsList }
              onClickSubscription={this.handleClickSubscription} 
              onClickCategory={ this.handleClickCategory }  
              onClickSync={ this.handleSync }  
            />
          </div>
          <div className="resizer vertical resize1"/>
          <div className="pane pane-feeds" ref="paneFeeds" style={{flex: `0 0 ${feedsWidth}px`}}>
            <Feeds 
              height={ browserHeight } 
              entries={ entriesList } 
              clickFeed={ this.handleClickFeed }
            />
          </div>
          <div className="resizer vertical resize2" />
          <div className="pane pane-content" ref="paneContent">
            <Entry data={data} />
          </div>
        </div>

      </div>
    )
  }
}

import './index.sass'

const mapStateToProps = state => {
  const { Categories, Streams, Entries, Datas } = state
  return { Categories, Streams, Entries, Datas }
}

export default connect(mapStateToProps)(ReaderContainer)
