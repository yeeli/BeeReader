const Feedly = require('../services/feedly')

feedly = new Feedly()

const test = async () => {
  const account = await feedly.getProfile()
  await feedly.fetchCategories()
  await feedly.fetchSubscriptions()
  await feedly.fetchFeeds()
}

test().then(() => {
  //process.exit(0)
})
//feedly.getCategories()

/*
Account.all().map(function(row){
  console.log(row)
})
.catch(function(e) {
  console.error(e);
});
*/
