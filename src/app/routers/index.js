import React, {Component} from 'react';
import {Route, Switch, HashRouter as Router} from 'react-router-dom'

import GetStarted from '@/containers/getStarted'
import Reader from '@/containers/reader'


const Routers = () =>(
  <Router>
    <Switch>
      <Route exact path="/" component={GetStarted}/>
      <Route path="/reader" component={Reader}/>
    </Switch>
  </Router>
)

export default Routers
