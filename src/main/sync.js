const Feedly = require('../services/feedly')

feedly = new Feedly()
feedly.getProfile()

/*
Account.all().map(function(row){
  console.log(row)
})
.catch(function(e) {
  console.error(e);
});
*/
