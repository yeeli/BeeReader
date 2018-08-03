import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import Input from '@material-ui/core/Input'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid'

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class SubscribeStream extends Component {
  state = {
    checked: [],
    folderName: ''
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
  }

  handleChangeFolderName = (event) => {
    this.setState({
      folderName: event.target.value
    })
  }

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
        <DialogTitle id="alert-dialog-title">Add Subscription</DialogTitle>
        <DialogContent>
          <div className="block">
            <div className="block-hd"><h4>Rss description</h4></div>
            <div className="block-bd">
              <div className="stream-info">
                <h3>{rss.title} - {rss.description}</h3>            
                <p>{rss.feed_url}</p>
              </div>
            </div>
          </div>
          <div className="block">
            <div className="block-hd"><h4>Folders / Tags</h4></div>
            <div className="block-bd">
              <List className="listing-categories">
                {this.props.categories.map(category => (
                  <ListItem key={category.id}>
                    <ListItemText primary={category.title} />
                    <ListItemSecondaryAction>
                      <Switch
                        onChange={this.handleToggle(category.id)}
                        checked={ this.state.checked.indexOf(category.id) !== -1 }
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
          <div className="block block-new-category">
            <div className="block-bd">
              <Grid container spacing={24}>
                <Grid item xs={10}>
                  <Input
                    placeholder="New folder..."
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                    value={ this.state.folderName }
                    style={{width: '100%'}}
                    onChange={ this.handleChangeFolderName }
                  />
                </Grid>
                <Grid item xs={2} style={{textAlign: "right"}}>
                  <Button variant="contained" color="primary" onClick={(e) => { this.props.onNewFolder(e, this.state.folderName)}} >Save</Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={ (e) => { this.props.onSubscribe(e, this.state.checked) }} color="primary" autoFocus>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}


import './index.sass'

export default SubscribeStream
