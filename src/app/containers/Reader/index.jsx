import React, { Component } from 'react'
import { connect } from 'react-redux'

import SplitPane from 'react-split-pane'
import Subscriptions from 'components/Subscriptions'
import Feeds from 'components/Feeds'
import interact from 'interactjs'

class Reader extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
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

  }

  render () {
    return (
      <div id="reader">
        <div className="reader-container split-pane">
          <div className="pane pane-subscriptions" ref="paneSubscriptions">
            <Subscriptions />
          </div>
          <div className="resizer vertical resize1"/>
          <div className="pane pane-feeds" ref="paneFeeds">
            <Feeds />
          </div>
          <div className="resizer vertical resize2" />
          <div className="pane pane-content">
            <div />
          </div>
        </div>
      </div>
    )
  }
}

import './index.sass'
export default Reader
