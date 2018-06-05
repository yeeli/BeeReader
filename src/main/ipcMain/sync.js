const {ipcMain} = require('electron')
feedly = new Feedly()

const syncFeedly = async () => {
  const account = await feedly.getProfile()
  await feedly.fetchCategories()
  await feedly.fetchStreams()
  await feedly.fetchEntries()
}

ipcMain.on('/sync', (event, arg) => {
   syncFeedly() 
})
