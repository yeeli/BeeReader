const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path')
const { env, output } = require('../configuration.js')
const postcssConfigPath = path.resolve(process.cwd(), '.postcssrc.yml')

module.exports = {
  test: /\.(scss|sass)$/i,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    { loader: 'css-loader', options: { minimize: env.NODE_ENV === 'production', root: output.staticPath } },
    { loader: 'postcss-loader', options: { sourceMap: true, config: { path: postcssConfigPath } } },
    'resolve-url-loader',
    { loader: 'sass-loader', options: { sourceMap: true } }
  ]
}
