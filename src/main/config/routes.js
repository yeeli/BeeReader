const routes = {
  'get /accounts': { to: 'accounts#index' },
  'post /accounts/create': { to: 'accounts#create' },
  'get /categories': { to: 'categories#index' },
  'post /categories/create': { to: 'categories#create' },
  'get /streams': { to: 'streams#index'},
  'post /streams/create': { to: 'streams#create'},
  'post /streams/destroy': { to: 'streams#destroy' },
  'get /streams/rss': { to: 'streams#rss' },
  'get /folders': { to: 'folders#index' },
  'get /datas/show': { to: 'datas#show' },
  'get /entries': { to: 'entries#index' },
  'get /entries/sync': { to: 'entries#sync' },
  'post /entries/read': { to: 'entries#read' }
}

module.exports = routes
