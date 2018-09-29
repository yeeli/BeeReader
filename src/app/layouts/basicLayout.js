import React, { PureComponent } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { connect } from 'react-redux'

class BasicLayout extends PureComponent {
  render() {
    return (
      <div id="basic">
        <CssBaseline />
        { this.props.children }
      </div>
    )
  }
}

export default BasicLayout
