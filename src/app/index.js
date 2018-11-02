import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash'
import { AppContainer } from 'react-hot-loader'

import Root from '~/containers/root';
import { configureStore, history } from './store/configureStore'

import  * as AccountsActions from '~/actions/accounts'
import  * as AppActions from '~/actions/app'
import  * as FoldersActions from '~/actions/folders'
import  * as CategoriesActions from '~/actions/categories'
import  * as StreamsActions from '~/actions/streams'
import  * as EntriesActions from '~/actions/entries'
import  * as DataActions from '~/actions/data'

const storage = window.localStorage

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

// Sync All infomation with starting
store.dispatch(AccountsActions.fetchAccounts()).then(res => {
  if(res.meta.status == "success") {
    let account = _.find(res.data.accounts, {service: 'Rss'})
    if(!_.isEmpty(account)){
      store.dispatch(AppActions.setCurrentAccount(account))
      store.dispatch(FoldersActions.fetchFolders(account))
      store.dispatch(CategoriesActions.fetchCategories(account))
      store.dispatch(StreamsActions.fetchStreams(account))
      store.dispatch(EntriesActions.fetchEntries(account))
    }
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
