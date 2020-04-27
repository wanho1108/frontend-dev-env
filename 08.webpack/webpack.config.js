const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const apiMocker = require('connect-api-mocker');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  devServer: {
    overlay: true,
    stats: 'errors-only',
    before: app => {
      app.use(apiMocker('/api', 'mocks/api'));
      // app.get('/api/users', (req, res) => {
      //   res.json([{
      //     id: 1,
      //     name: 'Alice'
      //   }, {
      //     id: 2,
      //     name: 'Bek'
      //   }, {
      //     id: 3,
      //     name: 'Chris'
      //   }])
      // })
    },
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          // publicPath: './dist/',
          name: '[name].[ext]?[hash]',
          limit: 20000, // 20kb
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        Author: ${childProcess.execSync('git config user.name')}
      `
    }),
    new webpack.DefinePlugin({
      TWO: '1+1',
      TWOString: JSON.stringify('1+1'),
      'api.domain': JSON.stringify('http://dev.api.domain.com')
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      },
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true,
        removeComments: true
      } : false
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].css' })]
      : []
      )
  ]
};