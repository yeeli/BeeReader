import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class SubscribeStream extends Component {
  state = {
    checked: [1]
  }
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };
  render() {
    const { categories, rss } = this.props
    return (
      <Dialog
        open={this.props.open}
        onClose={ this.props.onClose }
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        className="dialog-subscribe-stream"
      >
        <DialogTitle id="alert-dialog-title">{"Add Subscription"}</DialogTitle>
        <DialogContent>
          <div className="stream-title">
            <h3>{rss.title}</h3>            
            <p>{rss.feed_url}</p>
            <p>{rss.description}</p>
          </div>
          <List>
            {this.props.categories.map(category => (
              <ListItem key={category.id} dense button>
                <ListItemText primary={category.name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    onChange={this.handleToggle(category.id)}
                    checked={this.state.checked.indexOf(value) !== -1}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={ (e) => { this.props.onSubscribe(e) }} color="primary" autoFocus>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}


import './index.sass'

export default SubscribeStream
