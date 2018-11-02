import { remote } from 'electron'
const Menu = remote.Menu

import  * as AppActions from '~/actions/app'
import  * as AccountsActions from '~/actions/accounts'
import  * as FoldersActions from '~/actions/folders'
import  * as CategoriesActions from '~/actions/categories'
import  * as StreamsActions from '~/actions/streams'
import  * as EntriesActions from '~/actions/entries'
import  * as DataActions from '~/actions/data'

const SetMenu = (store, history, locale)  => {
  const intl = (id, defaultMessage) => {
    return locale[id] ? locale[id] : defaultMessage
  }
  const {Accounts, App} = store.getState()
  let template = []
  template.push({
    label: '',
    submenu: [
      {label: intl('preferences', 'Preferences'), click() {
        return history.push({pathname: '/preferences/general'})
      }}
    ]
  })

  template.push({
    label: intl('file', 'File'),
    submenu: [
      {label: intl('importOPML', "Import OPML"), click() {
        return history.push({pathname: '/preferences/opml'})
      }},
      {label: intl( 'exportOPML', 'Export OPML')}
    ]
  })

  template.push({
    label: intl('edit', 'Edit'),
    submenu: [
      {role: 'undo', label: intl('undo')},
      {role: 'redo', label: intl('redo')},
      {type: 'separator'},
      {role: 'cut', label: intl('cut')},
      {role: 'copy', label: intl('copy')},
      {role: 'paste', label: intl('paste') },
      {role: 'selectall', label: intl('selectall')}
    ]
  })

  let viewSubMenu = []
  if(process.env.NODE_ENV == "development") {
    viewSubMenu.push(
      {role: 'reload', label: intl('reload')},
      {role: 'forcereload', label: intl('forcereload')},
      {role: 'toggledevtools', label: intl('toggledevtools')},
      {type: 'separator'}
    )
  }
  viewSubMenu.push(
    {label: intl('allArticle', 'All Article'), click() {
      store.dispatch(AppActions.filterEntries({ type: 'all'}))
    }},
    {label: intl('unreadArticle', 'Unread Article'), click() {
      store.dispatch(AppActions.filterEntries({ type: 'unread'}))
    }}, 
    {label: intl('todayArticle', 'Today Article'), click() {
      store.dispatch(AppActions.filterEntries({ type: 'today' }))
    }}
  )

  template.push({
    label: intl('view', 'View'),
    submenu: viewSubMenu
  })

  template.push({
    label: intl('subscriptions', 'Subscriptions'),
    submenu: [
      {label: intl('provious','Provious Subscription')},
      {label: intl('next', 'Next Subscription')}, 
      {type: 'separator'},
      {label: intl('addSubscription', 'Add Subscription'), click() {
         store.dispatch(AppActions.openNewSubscription())
      }},
      {type: 'separator'},
      {label: intl('makeAllAsRead', 'Make All As Read')}
    ]
  })

  template.push({
    label: intl('article', 'Articles'),
    submenu: [
      {label: intl('provious','Provious Article')},
      {label: intl('next', 'Next Article')}, 
      {type: 'separator'},
      {label: intl('toggleRead', 'Toggle Read')},
      {type: 'separator'},
      {label: intl('viewArticle', 'View Article')},
    ]
  })


  template.push({
    label: intl('windows', 'Windows'),
    submenu: [
      {role: 'minimize', label: intl('minimize', 'Minimize')},
      {role: 'zoom', label: intl('zoom', 'Zoom')},
      {role: 'front', label: intl('front', 'Front')}
    ]
  })

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

export default SetMenu
