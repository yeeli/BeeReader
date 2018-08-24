import { remote } from 'electron'
const Menu = remote.Menu

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'}
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
