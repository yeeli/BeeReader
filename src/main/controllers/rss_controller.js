const Rss = require('../services/rss')

class RssController {
  async show() {
    let { url } = this.request.params
    let rss = new Rss(url)
    return rss.getFeed().then(res => {
      console.log(res)
      this.response.body = {
        meta: { status: 'success'},
        data: { rss: res }
      }
    }).catch(e => {
      this.response.body = {
        meta: { status: 'failed'},
        data: { error_message: e }
      }
    })

  }
}

module.exports = RssController
