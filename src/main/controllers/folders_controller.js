const { Folder } = require('../model')

class FoldersController {
  async index() {
    let folders = await Folder.all()
    this.response.body = {
      meta: { status: 'success' }, 
      data: { folders: folders }
    }
  }
}

module.exports = FoldersController
