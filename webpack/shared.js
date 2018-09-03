const webpack = require('webpack');
const paths = require('../src/main/config/paths');

module.exports = {
  target: 'electron-renderer',
  entry: {
    'app': [
      '@babel/polyfill',
      paths.appIndexJs
    ],
  },
  resolve: {
    modules: ['node_modules', paths.nodeModules, paths.appSrc].concat(paths.nodePaths),
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
      '~': paths.appSrc
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
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
