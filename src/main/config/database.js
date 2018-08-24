const { app } =  require('electron')
const path = require('path');

let dbConfig = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: 'BeeReaderDev.db'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: path.join(app.getPath('userData'),'Data/br.db')
    },
    useNullAsDefault: true
  }
}

module.exports = dbConfig

