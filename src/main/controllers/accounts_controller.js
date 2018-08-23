const {Account, Entry} = require('../model')

class AccountsController {
  async index() {
    let accounts = await Account.all()
    for (let account of accounts) {
      let date = new Date()
      let count = await Entry.connection().whereRaw('account_id = ? AND published_at >= ? AND read_at is null', [account.id, new Date(date.toDateString()).getTime()]).count()
      account['today_count'] = count[0]['count(*)']
    }
    this.response.body = {
      meta: { status: 'success' },
      data: { accounts: accounts }
    }
  }

  async create() {
    let accounts = await Account.where({service: this.request.params.service})
    if(accounts.length > 0) {
      this.response.body = {
        meta: { status: 'failed' },
        data: { error_message: 'account exists'}
      }
      return
    }

    let account = await Account.create({
      oid: Date.now(),
      title: 'local',
      service: 'Rss',
      username: 'rss',
      sort: 0,
      state: 'active'
    })

    this.response.body = {
      meta: { status: 'success' }, 
      data: { account: account }  
    }
  }
}

module.exports = AccountsController
