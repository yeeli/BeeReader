const { session } =  require('electron')

const webFilter = () => {
  var filter = {
    urls: ['https://image.jiqizhixin.com/*']
  }
  
  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    details.requestHeaders['referer'] = 'http://jiqizhixin.com'
    callback({cancel: false, requestHeaders: details.requestHeaders})
  })
}

module.exports = webFilter
