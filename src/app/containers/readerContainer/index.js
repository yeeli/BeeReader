import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import SplitPane from 'react-split-pane'
import interact from 'interactjs'
import Subscriptions from '@/components/subscriptions'
import Feeds from '@/components/feeds'

import  * as CategoriesActions from '@/actions/categories'
import  * as SubscriptionsActions from '@/actions/subscriptions'
import  * as EntriesActions from '@/actions/entries'

import { Link } from 'react-router-dom'

class ReaderContainer extends Component {
   constructor(props) {
    super(props);
    this.state = {subscriptionsList : [], synced: false}
  }
  componentDidMount() {
    this.props.dispatch(CategoriesActions.fetchCategories())
    this.props.dispatch(SubscriptionsActions.fetchSubscriptions())
    this.props.dispatch(EntriesActions.fetchEntries())
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
    const { isCategoriesLoaded, categories, isSubscriptionsLoaded, subscriptions } = this.props
    if(isCategoriesLoaded && isSubscriptionsLoaded && !this.state.synced) {
      let subscriptionsList = categories.map(category => {
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
    return (
      <div id="reader">
        <div className="reader-container split-pane">
          <div className="pane pane-subscriptions" ref="paneSubscriptions">
            <Subscriptions categories={ synced ? this.state.subscriptionsList : [] } />
          </div>
          <div className="resizer vertical resize1"/>
          <div className="pane pane-feeds" ref="paneFeeds">
            <Feeds />
          </div>
          <div className="resizer vertical resize2" />
          <div className="pane pane-content">
            <Link to="/">首页</Link>
          </div>
        </div>
      </div>
    )
  }
}

import './index.sass'

const mapStateToProps = state => {
  const isCategoriesFetching = state.Categories.isFetching
  const isCategoriesLoaded = state.Categories.isLoaded
  const categories = state.Categories.items

  const isSubscriptionsFetching = state.Subscriptions.isFetching
  const isSubscriptionsLoaded = state.Subscriptions.isLoaded
  const subscriptions = state.Subscriptions.items
  return { isCategoriesFetching, isCategoriesLoaded, categories, isSubscriptionsFetching, isSubscriptionsLoaded, subscriptions }
}

export default connect(mapStateToProps)(ReaderContainer)
