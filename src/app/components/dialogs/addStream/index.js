import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import {injectIntl, FormattedMessage} from 'react-intl'

class AddStream extends Component {
  state = {
    url: '',
    inputError: false,
    errorMsg: '',
  }
  handleChange = (event) => {
    this.setState({url: event.target.value})
  }
  handleSubmit = (event) => {
    if(this.state.url == '') {
      this.setState({inputError: true, errorMsg: 'Url is Blank'})
    } else {
      this.props.onSearch(event, this.state.url)
    }
  }
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={ this.props.onClose }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">
            <FormattedMessage id="addSubscription" defaultMessage="Add Subscription" />
        </DialogTitle>
        <DialogContent>
          <FormControl error = {this.state.inputError} fullWidth >
           <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Feed or Site URL"
              error = {this.state.inputError}
              onChange={this.handleChange}
            />
            { this.state.inputError && <FormHelperText id="name-helper-text">{this.state.errorMsg}</FormHelperText> }
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            <FormattedMessage id="cancel" defaultMessage="Cancel" />
          </Button>
          <Button onClick={ this.handleSubmit  } color="primary" autoFocus>
            <FormattedMessage id="search" defaultMessage="Search" />

          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default injectIntl(AddStream)
