'use strict'

const webpack = require('webpack');
const path = require('path');
const paths = require('../src/config/paths');
const { env } = require('process')
const sharedConfig = require('./shared')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge')

const config = merge(sharedConfig, {
  output: { 
    filename: 'bundle.js',
    path: paths.appBuild,
    //publicPath: paths.publicPath
  },
  devtool: 'source-map',
  stats: 'normal',
  entry: {
    'app': [
      'babel-polyfill',
      paths.appIndexJs
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
});

module.exports = config;
