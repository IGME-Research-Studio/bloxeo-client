/**
* From facebookincubator/create-react-app
*/

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var NpmInstallPlugin = require('npm-install-webpack-plugin');
var paths = require('./paths');
var env = require('./env');

module.exports = {
  devtool: 'source-map',
  contentBase: 'build',

  entry: [
    require.resolve('./polyfills'),
    path.join(paths.appSrc, 'app')
  ],

  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.json', ''],
  },

  module: {

    loaders: [

      {
        test: /\.js$/,
        include: paths.appSrc,
        loader: 'babel',
      },

      {
        test: /\.scss$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      },

      {
        test: /\.json$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'json'
      },

      {
        test: /\.(ico|jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        include: [paths.appSrc, paths.appNodeModules],
        exclude: /\/favicon.ico$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[ext]'
        }
      },

      {
        test: /\/favicon.ico$/,
        include: [paths.appSrc],
        loader: 'file',
        query: {
          name: 'favicon.ico?[hash:8]'
        }
      },

      {
        test: /\.(mp4|webm)(\?.*)?$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[ext]'
        }
      },

      {
        test: /\.html$/,
        loader: 'html',
        query: {
          attrs: ['link:href'],
        }
      }
    ]
  },

  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
  },

  plugins: [
    new NpmInstallPlugin(),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `env.js`.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
    }),
    new ExtractTextPlugin('static/css/[name].css'),
    new CaseSensitivePathsPlugin(),
  ]
};
