import { remote } from 'electron'
const Menu = remote.Menu

const SetMenu = (store, history)  => {

  const template = [
    {
      label: '',
      submenu: [
        {label: 'Preferences', click() {
          return history.push({pathname: '/preferences/general'})
        }}
      ]
    },
    {
      label: 'File',
      submenu: [
        {label: 'Import OPML'},
        {label: 'Export OPML'}
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
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
      label: 'View',
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
      label: 'Subscriptions',
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
      label: 'Windows',
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
