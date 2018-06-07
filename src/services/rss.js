const Service = require('./service')
const axios = require('axios')
const Parser = require('rss-parser')
const parse5 = require('parse5')
const { JSDOM } = require('jsdom')

class Rss extends Service {
  constructor(){
    super()
    this.parser = new Parser()
  }

  async getEntries(uri) {
    let feed = await this.parser.parseURL(uri)
    return feed.items.map(res => {
      let content = ""
      let summary = null
      if(res['content:encoded']){
        content = res['content:encoded']
      } else {
        content = res.content
      }
      return { 
        title: res.title, 
        author: res.creator, 
        link:  res.link,
        published_at: res.pubDate,
        content: content,
        summary: res.contentSnippet,
        keywords: res.categories,
      }
    })
  }

  async getIcon(uri){
    let res = await axios.get(uri)
    const window = (new JSDOM(res.data)).window
    iconLink = ""
    for (let i of window.document.querySelectorAll("link")) {
      if(i.outerHTML.match('shortcut icon')){
        iconLink = i.href
      }
    }
    return iconLink
  }
}


module.exports = Rss
