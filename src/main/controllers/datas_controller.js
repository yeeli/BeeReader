const { Data } = require('../model')

class DatasController {
  async show() {
    let { entry } = this.request.params
    let datas = await Data.where({entry_id: entry})
    this.response.body = {
      meta: { status: 'success' }, 
      data: { data: datas[0] }
    }
  }
}

module.exports = DatasController
