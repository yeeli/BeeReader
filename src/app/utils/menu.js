import { remote } from 'electron'
const Menu = remote.Menu

import  * as AppActions from '~/actions/app'

const SetMenu = (store, history, locale)  => {
  const intl = (id, defaultMessage) => {
    return locale[id] ? locale[id] : defaultMessage
  }
  const template = [
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
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    },
    {
      label: intl('view', 'View'),
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {label: 'All Article', click() {
          return history.push({pathname: '/reader'})
        }},
        {label: 'Unread Article'}, 
        {label: 'Today Article'}
      ]
    },
    {
      label: intl('subscriptions', 'Subscriptions'),
      submenu: [
        {label: 'Provious'},
        {label: 'Next'}, 
        {type: 'separator'},
        {label: 'Toggle Read'},
        {label: 'Toggle Starred'},
        {type: 'separator'},
        {label: 'View Article'},
        {label: 'Make Alll As Read'}
      ]
    },
    {
      label: intl('windows', 'Windows'),
      submenu: [
        {role: 'minimize'},
        {role: 'zoom'},
        {role: 'front'}
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

}

export default SetMenu
