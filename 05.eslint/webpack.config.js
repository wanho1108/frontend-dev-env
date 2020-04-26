const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
  }
}