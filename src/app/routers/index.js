import React, {Component} from 'react';
import {Route, Switch, HashRouter as Router} from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import AppContainer from '~/containers/appContainer'
import ReaderContainer from '~/containers/readerContainer'
import GeneralContainer from '~/containers/preferences/generalContainer'


const Routers = ({history}) =>(
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={AppContainer}/>
      <Route path="/reader" component={ReaderContainer}/>
      <Route path="/preferences/general" component={GeneralContainer}/>
    </Switch>
  </ConnectedRouter>
)

export default Routers
