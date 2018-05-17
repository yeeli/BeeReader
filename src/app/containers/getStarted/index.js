import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class GetStarted extends Component {
  render () {
    console.log("123")
    return (
      <div>
        <Link to="/reader">Reader</Link>
        123
      </div>
    )
  }
}

export default connect()(GetStarted)
