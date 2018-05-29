const { ipcRenderer } = require('electron')

const sync = opts => store => next => action => {
  const { sync, ...others } = action
  if (!sync) {
    return next(action)
  }
  const { method, event, params } = sync
  next(others)
  //if ( method == 'SYNC') {
  //  return Promise.resolve(ipcRenderer.sendSync(event, params))
  //}
  ipcRenderer.send(event, params)
  return new Promise( (resolve, reject) => {
    return ipcRenderer.once(`${event}Response`, (event, arg) => {
      resolve(arg)
    }) 
  })
}

export default sync()
