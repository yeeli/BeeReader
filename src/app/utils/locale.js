import glob from 'glob'
import path from 'path'
import _ from 'lodash'

const locales = []
glob.sync(path.join('src/app/locales/', '*.js')).forEach( function( file ) {
  if(file.match(/\.js/)){
    var name = path.basename(file)
    locales.push(require(`~/locales/${name}`).default)
  }
});

const getLocale = (lang) => {
  let data = _.find(locales, {locale: lang})
  return {locale: lang, data: data }
}

export default { getLocale, locales }
