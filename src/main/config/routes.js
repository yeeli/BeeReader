const routes = {
  'get /accounts': { to: 'accounts#index' },
  'post /accounts/create': { to: 'accounts#create' },
  'get /categories': { to: 'categories#index' },
  'post /categories/create': { to: 'categories#create' },
  'get /streams': { to: 'streams#index'},
  'post /streams/create': { to: 'streams#create'},
  'post /streams/destroy': { to: 'streams#destroy' },
  'post /streams/update': { to: 'streams#update' },
  'post /streams/make_all_read': { to: 'streams#makeAllRead'},
  'get /folders': { to: 'folders#index' },
  'get /datas/show': { to: 'datas#show' },
  'get /entries': { to: 'entries#index' },
  'get /entries/sync': { to: 'entries#sync' },
  'post /entries/read': { to: 'entries#read' },
  'get /rss/show': { to: 'rss#show'}
}

module.exports = routes
