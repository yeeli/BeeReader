import glob from 'glob'
import path from 'path'
import _ from 'lodash'

  /*
const locales = []
glob.sync(path.join('src/app/locales/', '*.js')).forEach( function( file ) {
  if(file.match(/\.js/)){
    var name = path.basename(file)
    locales.push(require(`~/locales/${name}`).default())
  }
});
*/

const getLocale = (lang) => {
  let data
  switch(lang){
    case 'zh-CN':
      data = require('~/locales/zh-CN')
      break
    case 'en-US':
      data = require('~/locales/en-US')
      break
    default:
      data = require(`~/locales/${lang}`)
      
  }
  return data.default
}

export default { getLocale }
