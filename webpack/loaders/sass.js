const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const { env, output } = require('../configuration.js')
const postcssConfigPath = path.resolve(process.cwd(), '.postcssrc.yml')

module.exports = {
  test: /\.(scss|sass)$/i,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      { loader: 'css-loader', options: { minimize: env.NODE_ENV === 'production', root: output.staticPath } },
      { loader: 'postcss-loader', options: { sourceMap: true, config: { path: postcssConfigPath } } },
      'resolve-url-loader',
      { loader: 'sass-loader', options: { sourceMap: true } }
    ]
  })
}
