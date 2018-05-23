import React, { Component } from 'react'
import { connect } from 'react-redux'

import SplitPane from 'react-split-pane'
import interact from 'interactjs'
import Subscriptions from '@/components/subscriptions'
import Feeds from '@/components/feeds'
import {fetchSubscriptions} from '@/actions/subscriptions'

import { Link } from 'react-router-dom'

class ReaderContainer extends Component {
  componentDidMount() {
    //this.props.fetchSubscriptions()
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

  render () {
    const { subscriptions } = this.props
    return (
      <div id="reader">
        <div className="reader-container split-pane">
          <div className="pane pane-subscriptions" ref="paneSubscriptions">
            <Subscriptions subscriptions={ subscriptions } />
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

const mapStateToProps = state => ({
  subscriptions: state.Subscriptions
})

export default connect(mapStateToProps, {fetchSubscriptions})(ReaderContainer)
