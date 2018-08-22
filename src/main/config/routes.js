const routes = {
  'get /accounts': { to: 'accounts#index' },
  'post /accounts/create': { to: 'accounts#create' } 
}

module.exports = routes
