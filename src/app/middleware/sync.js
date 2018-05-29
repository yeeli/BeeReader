import { ipcRenderer } from 'electron'
import api from '@/config/api'


const sync = opts => store => next => action => {
  const { sync, ...others } = action
  if (!sync) {
    return next(action)
  }
  const { method, url, params } = sync
  next(others)
  //if ( method == 'SYNC') {
  //  return Promise.resolve(ipcRenderer.sendSync(event, params))
  //}
  event = api[url]
  ipcRenderer.send(event, params)
  return new Promise( (resolve, reject) => {
    return ipcRenderer.once(`${event}Response`, (event, arg) => {
      resolve(arg)
    }) 
  })
}

export default sync()
