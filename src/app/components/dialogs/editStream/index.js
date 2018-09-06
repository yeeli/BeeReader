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
import FormControl from '@material-ui/core/FormControl'

import AddIcon from '@material-ui/icons/AddCircle'
import {injectIntl, FormattedMessage} from 'react-intl'

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class EditStream extends Component {
  state = {
    title: '',
    checked: [],
    folderName: '',
    isOpen: false
  }
  constructor(props) {
    super(props);
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

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  static getDerivedStateFromProps(prevProps, prevState) {
    if(prevProps.open && !prevState.isOpen) {
      return { title: prevProps.stream.title, checked: prevProps.checked, folderName: '', isOpen: true }
    } 
    else if( prevProps.open == false ) {
      return { isOpen: false }
    }
    else {
      return prevState
    }
  }
  
  render() {
    const { categories, stream, intl } = this.props
    return (
      <Dialog
        open={this.props.open}
        onClose={ this.props.onClose }
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        className="dialog-edit-stream dialog"
      >
        <DialogTitle  id="alert-dialog-title" className="dialog-title" style={{margin: 0, borderBottom: '1px solid #e5e5e5'}}>
          <FormattedMessage id="editSubscription" defaultMessage="Edit Subscription"/>
        </DialogTitle>
        <DialogContent className="dialog-ss-bd">
          <div className="block">
            <div className="block-hd"><h4><FormattedMessage id="rssDesc" defaultMessage="Rss description"/></h4></div>
            <div className="block-bd">
              <FormControl fullWidth className="form-control" >
                  <Input
                    placeholder={ intl.formatMessage({id: "title", defaultMessage: "Title"}) }
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                    value={ this.state.title }
                    style={{width: '100%', fontSize: '14px'}}
                    onChange={ this.handleChangeTitle }
                  />
              </FormControl>
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
            <FormControl fullWidth className="form-control" >
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
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions style={{margin: 0, padding: '20px 24px 20px', borderTop: '1px solid #e5e5e5'}}>
          <Button onClick={this.props.onClose} color="default">
            <FormattedMessage id="cancel" defaultMessage="Cancel" />
          </Button>
          <Button variant="contained" onClick={ this.props.onUpdate(stream.id, this.state.title, this.state.checked) } color="primary" autoFocus>
            <FormattedMessage id="update" defaultMessage="Update" />
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}


import './index.sass'

export default injectIntl(EditStream)
