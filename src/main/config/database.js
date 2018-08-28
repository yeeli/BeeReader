const path = require('path');

let userData = ""
if (process.env.NODE_ENV !== 'development') {
  const { app } =  require('electron')
  userData = app.getPath('userData')
}

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
      filename: path.join(userData,'Data/br.db')
    },
    useNullAsDefault: true
  }
}

module.exports = dbConfig

