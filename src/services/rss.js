const Service = require('./service')
const axios = require('axios')
const Parser = require('rss-parser')
const parse5 = require('parse5')
const { JSDOM } = require('jsdom')

class Rss extends Service {
  constructor(uri){
    super()
    this.parser = new Parser()
    this.uri = uri
  }

  async getFeed() {
    this.feed = await this.parser.parseURL(this.uri)
    let icon = await this.getIcon()
    return {
      title: this.feed.title,
      link: this.feed.link,
      description: this.feed.description,
      feed_url: this.feed.feedUrl,
      icon: icon
    }
  }

  async getEntries() {
    return this.feed.items.map(res => {
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

  async getIcon(){
    let res = await axios.get(this.feed.link)
    const window = (new JSDOM(res.data)).window
    let iconLink = null
    for (let i of window.document.querySelectorAll("link")) {
      if(i.outerHTML.match('shortcut icon')){
        iconLink = i.href
      }
    }
    if(!iconLink.match(/^http/)){
      iconLink = 'http:' + iconLink
    }
    return iconLink
  }
}


module.exports = Rss
