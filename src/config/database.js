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
      filename: 'BeeReader.db'
    },
    useNullAsDefault: true
  }
}

module.exports = dbConfig

