const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './app.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_moudles/
      }
    ]
  }
}