import React, {Component} from 'react';
import {Route, Switch, HashRouter as Router} from 'react-router-dom'

import AppContainer from '@/containers/appContainer'
import ReaderContainer from '@/containers/readerContainer'


const Routers = () =>(
  <Router>
    <Switch>
      <Route exact path="/" component={AppContainer}/>
      <Route path="/reader" component={ReaderContainer}/>
    </Switch>
  </Router>
)

export default Routers
