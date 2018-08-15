import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader'

import Root from '~/containers/root';
import { configureStore, history } from './store/configureStore'

import  * as AccountsActions from '~/actions/accounts'
import  * as AppActions from '~/actions/app'


// Disable Electron App Drop File
document.addEventListener('dragover', function (event) {
  event.preventDefault();
  return false;
}, false);

document.addEventListener('drop', function (event) {
  event.preventDefault();
  return false;
}, false);


const store = configureStore()
store.dispatch(AccountsActions.fetchAccounts()).then( res => {
  if(res.meta.status == "success"){
    let account = _.find(res.data.account, {service: 'Rss'})
    store.dispatch(AppActions.setCurrentAccount(account))
  }
})

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Root);

/*if (module.hot) module.hot.accept('./containers/root', () => {
  render(Root)
}); */
