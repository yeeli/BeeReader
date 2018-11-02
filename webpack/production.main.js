'use strict'

const webpack = require('webpack');
const path = require('path');
const paths = require('../src/main/config/paths');
const { env } = require('process')
const externalsDep = require('externals-dependencies')

const config = {
  mode: 'production',
  target: 'electron-main',
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true,
    path: true
  },
  entry: {
    'app': [
      paths.mainIndexJs
    ],
  },
  resolve: {
    modules: ['node_modules', paths.nodeModules, paths.dirSrc].concat(paths.nodePaths),
  },
  output: { 
    filename: 'index.js',
    path: paths.appBuild,
  },
  externals: [externalsDep()],
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
  ]
};

module.exports = config;
