import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AppContainer extends Component {
  componentWillMount() {
  }
  render () {
    return (
      <div>
        12333
      </div>
    )
  }
}

const mapStateToProps = state => ({
  subscriptions: state.Subscriptions
})


export default connect(mapStateToProps)(AppContainer)
