import { ipcRenderer } from 'electron'
import api from '~/config/api'


const sync = opts => store => next => action => {
  const { sync, ...others } = action
  if (!sync) {
    console.log("sync",action)
    return next(action)
  }
  const { method, url, params } = sync
  next(others)
  let eventName = api[url]
  let ktm = Date.now()
  console.log("send event: ", eventName, " params: ",JSON.stringify(params))
  ipcRenderer.send(eventName, params, ktm)
  return new Promise( (resolve, reject) => {
    return ipcRenderer.once(`${eventName}Response?ktm=${ktm}`, (event, arg) => {
      //console.log(`response event: ${eventName}Response?ktm=${ktm}, data: ${JSON.stringify(arg)}`)
      resolve(arg)
    }) 
  })
}

export default sync()
