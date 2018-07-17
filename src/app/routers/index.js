import React, {Component} from 'react';
import {Route, Switch, HashRouter as Router} from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import AppContainer from '~/containers/appContainer'
import ReaderContainer from '~/containers/readerContainer'


const Routers = ({history}) =>(
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={AppContainer}/>
      <Route path="/reader" component={ReaderContainer}/>
    </Switch>
  </ConnectedRouter>
)

export default Routers
