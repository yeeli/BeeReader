const { Folder } = require('../model')

class FoldersController {
  async index() {
    let folders = await Folder.where(this.request.params)
    this.response.body = {
      meta: { status: 'success' }, 
      data: { folders: folders }
    }
  }
}

module.exports = FoldersController
