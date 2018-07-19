import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


class AddStream extends Component {
  state = {
    url: ''
  }
  handleChange = (event) => {
    this.setState({url: event.target.value})
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
        <DialogTitle id="alert-dialog-title">{"Add Subscription"}</DialogTitle>
        <DialogContent>
           <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Feed or Site URL"
              fullWidth
              onChange={this.handleChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={ (e) => { this.props.onSearch(e, this.state.url) }} color="primary" autoFocus>
            Search
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AddStream
