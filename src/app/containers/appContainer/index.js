import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AppContainer extends Component {
  render () {
    return (
      <div>
        <Link to="/reader">Reader</Link>
        123
      </div>
    )
  }
}

export default connect()(AppContainer)
