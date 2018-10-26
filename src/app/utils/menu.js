import { remote } from 'electron'
const Menu = remote.Menu
const Tray = remote.Tray

import  * as AppActions from '~/actions/app'

const SetMenu = (store, history, locale)  => {
  const intl = (id, defaultMessage) => {
    return locale[id] ? locale[id] : defaultMessage
  }
  const {Accounts, App} = store.getState()
  let template = []
  if(Accounts.isLoaded && !_.isEmpty(App.currentAccount)){
    template = [
      {
        label: '',
        submenu: [
          {label: intl('preferences', 'Preferences'), click() {
            return history.push({pathname: '/preferences/general'})
          }}
        ]
      },
      {
        label: intl('file', 'File'),
        submenu: [
          {label: intl('importOPML', "Import OPML"), click() {
            return history.push({pathname: '/preferences/opml'})
          }},
          {label: intl( 'exportOPML', 'Export OPML')}
        ]
      },
      {
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
      },
      {
        label: intl('view', 'View'),
        submenu: [
          {role: 'reload', label: intl('reload')},
          {role: 'forcereload', label: intl('forcereload')},
          {role: 'toggledevtools', label: intl('toggledevtools')},
          {type: 'separator'},
          {label: intl('allArticle', 'All Article'), click() {
            return history.push({pathname: '/reader'})
          }},
          {label: intl('unreadArticle', 'Unread Article')}, 
          {label: intl('todayArticle', 'Today Article')}
        ]
      },
      {
        label: intl('subscriptions', 'Subscriptions'),
        submenu: [
          {label: intl('provious','Provious')},
          {label: intl('next', 'Next')}, 
          {type: 'separator'},
          {label: intl('toggleRead', 'Toggle Read')},
          {label: intl('toggleStarred', 'Toggle Starred')},
          {type: 'separator'},
          {label: intl('viewArticle', 'View Article')},
          {label: intl('makeAllAsRead', 'Make All As Read')}
        ]
      },
      {
        label: intl('windows', 'Windows'),
        submenu: [
          {role: 'minimize', label: intl('minimize', 'Minimize')},
          {role: 'zoom', label: intl('zoom', 'Zoom')},
          {role: 'front', label: intl('front', 'Front')}
        ]
      }
    ]
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  tray = new Tray("")
  const contextMenu = Menu.buildFromTemplate([
    {label: 'News 1'},
  ])
  //tray.setTitle('This is my application.')
  tray.setContextMenu(contextMenu)

}

export default SetMenu
