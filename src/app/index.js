import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import App from './containers/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './shared/layout.sass'

// Material-UI use react-tap-event-plugin to listen for touch / tap / clickevents.
// http://www.material-ui.com/#/get-started/installation
injectTapEventPlugin();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App);

if (module.hot) module.hot.accept('./containers/App', () => {
  render(App)
});
