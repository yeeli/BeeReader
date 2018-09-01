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
  mode: 'production',
  output: { 
    filename: 'bundle.js',
    path: paths.appBuild,
    //publicPath: paths.publicPath
  },
  devtool: 'source-map',
  stats: 'normal',
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new MiniCssExtractPlugin({
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
