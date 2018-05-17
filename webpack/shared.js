const webpack = require('webpack'); 
const paths = require('./paths');

module.exports = {
  target: 'electron-renderer',
  resolve: {
    modules: ['node_modules', paths.appNodeModules, paths.appSrc].concat(paths.nodePaths),
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      containers: 'containers',
      components: 'components',
      actions: 'actions',
      reducers: 'reducers',
      'react-native': 'react-native-web',
      '@': paths.appSrc
    }
  },
  module: {
    rules: [
      {
        test: require.resolve('react'),
        use: 'imports-loader',
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.sass$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  }
}
