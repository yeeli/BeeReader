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
    for (let item of feed.items ) {
      console.log(item)
    }
  }
}

let rss = new Rss()
rss.getEntries("http://www.ifanr.com/feed")
rss.getEntries("http://36kr.com/feed")


/*
axios.get("http://www.pingwest.com/").then(res => {
  const window = (new JSDOM(res.data)).window
  for (let i of window.document.querySelectorAll("link")) {
    if(i.outerHTML.match('shortcut icon')){
      console.log(i.href)
    }
  }
})
*/
