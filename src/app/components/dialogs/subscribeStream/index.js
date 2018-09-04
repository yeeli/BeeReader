import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import Input from '@material-ui/core/Input'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid'

import AddIcon from '@material-ui/icons/AddCircle'
import {injectIntl, FormattedMessage} from 'react-intl'

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
    const { categories, rss, intl } = this.props
    return (
      <Dialog
        open={this.props.open}
        onClose={ this.props.onClose }
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        className="dialog-subscribe-stream dialog"
      >
        <DialogTitle  id="alert-dialog-title" className="dialog-title" style={{margin: 0, borderBottom: '1px solid #e5e5e5'}}>
          <FormattedMessage id="addSubscription" defaultMessage="Add Subscription"/>
      </DialogTitle>
        <DialogContent>
          <div className="block">
            <div className="block-hd"><h4><FormattedMessage id="rssDesc" defaultMessage="Rss description"/></h4></div>
            <div className="block-bd">
              <div className="stream-info">
                <h3>{rss.title} - {rss.feed_url}</h3>            
                <p>{rss.description}</p>
              </div>
            </div>
          </div>
          <div className="block">
            <div className="block-hd"><h4><FormattedMessage id="folderTitle" defaultMessage="Folders" /></h4></div>
            <div className="block-bd">
              <List className="listing-categories">
                {this.props.categories.map(category => (
                  <ListItem key={category.id}>
                    <ListItemText primary={category.title} className="category-name" />
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
          <div className="new-category">
            <Grid container >
              <Grid item xs={11} style={{paddingTop: '0', paddingBottom: '0'}}>
                <Input
                  placeholder={ intl.formatMessage({id: "newFolder", defaultMessage: "New folder..."}) }
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                  value={ this.state.folderName }
                  style={{width: '100%', fontSize: '14px'}}
                  onChange={ this.handleChangeFolderName }
                />
              </Grid>
              <Grid item xs={1} style={{textAlign: "left", padding: '0'}}>
                <IconButton disableRipple className={'content-button'} style={{width: '20px', height: '24px', marginTop: '3px', marginLeft: '20px'}}  onClick={ this.props.onNewFolder(this.state.folderName) } ><AddIcon /></IconButton>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions style={{margin: 0, padding: '20px 24px 20px', borderTop: '1px solid #e5e5e5'}}>
          <Button onClick={this.props.onClose} color="default">
            <FormattedMessage id="cancel" defaultMessage="Cancel" />
          </Button>
          <Button variant="contained" onClick={ this.props.onSubscribe(this.state.checked) } color="primary" autoFocus>
            <FormattedMessage id="subscribe" defaultMessage="Subscribe" />
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}


import './index.sass'

export default injectIntl(SubscribeStream)
