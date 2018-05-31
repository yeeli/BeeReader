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
    this.state = {subscriptionsList : [], synced: false}
  }
  componentDidMount() {
    this.props.dispatch(CategoriesActions.fetchCategories())
    this.props.dispatch(StreamsActions.fetchStreams())
    this.props.dispatch(EntriesActions.fetchEntries())
    this.props.dispatch(DatasActions.fetchDatas())
  /*
    self = this

      interact('.resize1')
      .draggable({
        onmove: window.dragMoveListener
      })
      .on('dragmove', function (event) {
        var target = self.refs.paneSubscriptions;
        var split = event.target
        var x = (parseFloat(split.getAttribute('data-x')) || 0);

        // update the element's style
        var width = parseFloat(target.offsetWidth)
        width += event.dx;
        target.style.flex = '0 0 ' +  width + 'px';
      });

    interact('.resize2')
      .draggable({
        onmove: window.dragMoveListener
      })
      .on('dragmove', function (event) {
        var target = self.refs.paneFeeds;
        var split = event.target
        var x = (parseFloat(split.getAttribute('data-x')) || 0);

        // update the element's style
        var width = parseFloat(target.offsetWidth)
        width += event.dx;
        target.style.flex = '0 0 ' +  width + 'px';
      });
      */
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
        return {...category, subscriptions: subs}
      })
      this.setState({
        subscriptionsList: subscriptionsList,
        synced: true
      })
    }
  }

  render () {
    const { synced, subscriptionsList } = this.state
    const { Entries, Datas } = this.props
    let entries = []
    let data = {}
    if(Entries.isLoaded) {
      entries = Entries.items
    }
    if(Datas.isLoaded) {
      data = Datas.items[1]
    }

    return (
      <div id="reader">
        <div className="reader-container split-pane">
          <div className="pane pane-subscriptions" ref="paneSubscriptions">
            <Subscriptions categories={ synced ? this.state.subscriptionsList : [] } />
          </div>
          <div className="resizer vertical resize1"/>
          <div className="pane pane-feeds" ref="paneFeeds">
            <Feeds entries={entries} />
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
