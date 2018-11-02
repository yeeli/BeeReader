import React, { PureComponent } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { connect } from 'react-redux'

// Material Ui
import Snackbar from '@material-ui/core/Snackbar'


// Actions
import  * as AppActions from '~/actions/app'

class BasicLayout extends PureComponent {
  handleTipsClose = (event) => {
    this.props.dispatch(AppActions.closeTips())
  }

  render() {
    const { App } = this.props
    return (
      <div id="basic">
        <CssBaseline />
        { this.props.children }
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal:  'center' }}
          open={ App.openTips }
          onClose={this.handleTipsClose }
          style={{marginTop: '10px', zIndex: '9999'}}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          autoHideDuration={2000}
          message={ <span id="message-id">{ App.tipsMsg }</span> }
        />

    </div>
    )
  }
}


const mapStateToProps = state => {
  const { App } = state
  return { App }
}
export default connect(mapStateToProps)(BasicLayout)
