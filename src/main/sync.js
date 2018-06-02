const Feedly = require('../services/feedly')

feedly = new Feedly()

const exitProcess = async() => {
  process.exit(0)
}

const test = async () => {
  const account = await feedly.getProfile()
  //await feedly.fetchCategories()
  //await feedly.fetchStreams()
  await feedly.fetchEntries()
  await exitProcess()
}

test()
