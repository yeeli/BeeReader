'use strict'

const webpack = require('webpack');
const path = require('path');
const paths = require('../src/main/config/paths');
const { env } = require('process')
const sharedConfig = require('./shared')

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge')

const config = merge(sharedConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    'app': [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:5000',
      'webpack/hot/only-dev-server',
      require.resolve('./webpackHotDevClient'),
      require.resolve('react-error-overlay'),
    ]
  },
  output: {
    publicPath: 'http://localhost:5000/dist',
    filename: 'bundle.js',
    pathinfo: true,
    path: paths.appBuild
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'main.html',
      template: "./src/main.html"
    })
  ],
  stats: { errors: true, errorDetails: true },
  devServer: {
    host: 'localhost',
    port: '5000',
    compress: true,
    hot: true,
    //historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    inline: true,
    stats: { errorDetails: true },
    headers: { 'Access-Control-Allow-Origin': '*' },
  }

});

module.exports = config;
