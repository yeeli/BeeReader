const { Stream } = require('../model')
const Rss = require('../services/rss')

class StreamsController {
  /*
   * /streams
   *
   * @desc Get all streams list with account
   *
   * @params account_id [Integer] Account id
   *
   */
  async index() {
    let streams = await Stream.where({})
    this.response.body = {
      meta: { status: 'success' }, 
      data: { streams: streams }
    }
  }

  /*
   * /streams/create
   *
   * @desc create Stream info with account
   *
   * @params account_id [Integer] Account id
   *
   */


  async create() {
    let { account, url, categories} = this.request.params
    return Sync.createStream(account, url, categories).then(res => {
      this.response.body = {
        meta: { status: 'success' },
        data: { 
          stream: res.stream,
          folders: res.folders
        }
      }
    }).catch(e => {
      this.reponse.body = {
        meta: { status: 'failed' },
        data: { error_message: e }
      }
    })
  }

  async rss() {
    let rss = new Rss(arg.url)
    rss.getFeed().then(res => {
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

module.exports = StreamsController
