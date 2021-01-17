const { resolve } = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const WebpackBaseConfig = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(WebpackBaseConfig, {
  mode: 'production',

  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: 'fast-viewerjs',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: `[file].map`
    }),
    new MiniCssExtractPlugin({
      filename: 'fast-viewerjs.css'
    }),
  ]
})
