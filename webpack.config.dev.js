'use strict'

const webpack = require('webpack');
const paths = require('./config/paths');
const { env } = require('process')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(['node_modules', paths.appNodeModules, paths.appSrc].concat(paths.nodePaths))

const config = {
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:5000',
      'webpack/hot/only-dev-server',
      require.resolve('./config/webpackHotDevClient'),
      paths.appIndexJs
    ]
  },
  output: {
    publicPath: 'http://localhost:5000/dist',
    filename: 'bundle.js',
    pathinfo: true,
    path: paths.appBuild
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules, paths.appSrc].concat(paths.nodePaths),
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      containers: 'containers',
      components: 'components',
      actions: 'actions',
      reducers: 'reducers',
      'react-native': 'react-native-web'
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
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'main.html',
      template: "./src/public/main.html"
    })
  ],
  stats: { errorDetails: true},
  devServer: {
    host: 'localhost',
    port: '5000',
    //compress: true,
    hot: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
  }
};

module.exports = config;
