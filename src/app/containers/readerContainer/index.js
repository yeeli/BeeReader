import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import SplitPane from 'react-split-pane'
import interact from 'interactjs'
import Subscriptions from '@/components/subscriptions'
import Feeds from '@/components/feeds'
import Entry from '@/components/entry'

import  * as CategoriesActions from '@/actions/categories'
import  * as StreamsActions from '@/actions/streams'
import  * as EntriesActions from '@/actions/entries'
import  * as DatasActions from '@/actions/datas'

import { Link } from 'react-router-dom'

class ReaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionsList : [], 
      synced: false, 
      showEntry: null, 
      showSubscriptions: [],
      browserHeight: document.body.scrollHeight,
      browserWidth: document.body.scrollWidth,
      subscriptionsWidth: 250,
      feedsWidth: 250,

    }
    this.handleClickFeed = this.handleClickFeed.bind(this)
    this.handleClickSubscription = this.handleClickSubscription.bind(this)
    this.handleClickCategory = this.handleClickCategory.bind(this)
    this.handleResizeFeeds = this.handleResizeFeeds.bind(this)
  }
  componentDidMount() {
    let self = this
    this.props.dispatch(CategoriesActions.fetchCategories())
    this.props.dispatch(StreamsActions.fetchStreams())
    this.props.dispatch(EntriesActions.fetchEntries())
    this.props.dispatch(DatasActions.fetchDatas())

    window.addEventListener("resize", this.handleWindowResize.bind(this))

    interact('.resize1').draggable({ onmove: window.dragMoveListener })
      .on('dragmove', self.handleResizeFeeds);

    interact('.resize2').draggable({ onmove: window.dragMoveListener})
      .on('dragmove', self.handleResizeFeeds);
  }

  componentDidUpdate(){
    const { Categories, Streams,  Entries } = this.props
    const subscriptions = Streams.items
    if(Categories.isLoaded && Streams.isLoaded && !this.state.synced) {
      let subscriptionsList = Categories.items.map(category => {
        let subs = category.stream_ids.split(",").map( stream => {
          let index = _.findIndex(subscriptions, (s) => { return stream == s.id.toString() })
          if(index != -1) {
            return subscriptions[index]
          }
        })
        return {...category, subscriptions: subs, open: false}
      })
      this.setState({
        subscriptionsList: subscriptionsList,
        synced: true
      })
    }
  }

  handleResizeSubscriptions(event) {
    var target = self.refs.paneSubscriptions;
    var split = event.target
    var x = (parseFloat(split.getAttribute('data-x')) || 0);

    // update the element's style
    var width = parseFloat(target.offsetWidth)
    width += event.dx;
    if( this.state.browserWidth - width - this.state.feedsWidth > 250) {
      this.setState({subscriptionsWidth: width})
    }

  }

  handleResizeFeeds(event) {
    var target = self.refs.paneFeeds
    var split = event.target 
    var x = (parseFloat(split.getAttribute('data-x')) || 0)
    // update the element's style 
    var width = parseFloat(target.offsetWidth) 
    width += event.dx; 
    if( this.state.browserWidth - width - this.state.subscriptionsWidth > 250) {
      this.setState({feedsWidth: width})
    }
  }

  handleClickCategory(event, id) {
    let changeSubscriptions = this.state.subscriptionsList.map((s) => {
      if(s.id == id) {
        if (s.open) {
          return {...s, open: false}
        } else {
          return {...s, open: true}
        }
      } else {
        return s
      }
    })
    this.setState({subscriptionsList: changeSubscriptions })
  }
  handleWindowResize() {
    //if(this.feedsWith > 250) {
    //  this.setState({browserHeight: document.body.scrollHeight, browserWidth: document.body.scrollWidth })
    //}
    this.setState({browserHeight: document.body.scrollHeight, browserWidth: document.body.scrollWidth })
  }

  handleClickSubscription(event, id){
    this.setState({showSubscriptions: [id]})
  }

  handleClickFeed(event, id) {
    this.setState({showEntry: id})
  }

  render () {
    const { synced, subscriptionsList, showEntry, showSubscriptions, browserHeight, subscriptionsWidth, feedsWidth } = this.state
    const { Entries, Datas } = this.props
    let entries = []
    let data = {}
    if(Entries.isLoaded) {
      entries = Entries.items
    }
    if(!_.isNil(showEntry)) {
      data = Datas.items[showEntry]
    }

    if(!_.isEmpty(showSubscriptions)) {
      entries = _.takeWhile(entries, (o) => { return _.includes(showSubscriptions, o.stream_id)})
    }

    return (
      <div id="reader">
        <div className="reader-container split-pane">
          <div className="pane pane-subscriptions" ref="paneSubscriptions" style={{flex: `0 0 ${subscriptionsWidth}px`}}>
            <Subscriptions  height={browserHeight} categories={ synced ? this.state.subscriptionsList : [] } onClickSubscription={this.handleClickSubscription} onClickCategory={ this.handleClickCategory } />
          </div>
          <div className="resizer vertical resize1"/>
          <div className="pane pane-feeds" ref="paneFeeds" style={{flex: `0 0 ${feedsWidth}px`}}>
            <Feeds entries={entries} clickFeed={this.handleClickFeed} height={browserHeight} />
          </div>
          <div className="resizer vertical resize2" />
          <div className="pane pane-content">
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
