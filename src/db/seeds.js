const Model = require('../main/model')

Model.Account.where({service: 'Rss'}).then(res => {
  if(res.length < 1) {
    console.log("create local account rss")
    Model.Account.create({
      oid: Date.now(),
      title: 'local',
      service: 'Rss',
      username: 'rss',
      sort: 0,
      state: 'active'
    }).then(() => { 
      process.exit(0)
    })
  }
})
