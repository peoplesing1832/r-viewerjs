const { resolve } = require('path')

module.exports = {

  entry: {
    'main': resolve(__dirname, '../src/index'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /.ts|tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
