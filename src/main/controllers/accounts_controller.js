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

  async create(params) {
    this.response.body = this.request.params 
  }
}

module.exports = AccountsController
