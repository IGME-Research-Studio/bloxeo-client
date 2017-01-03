/**
* From facebookincubator/create-react-app
*/

var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var url = require('url');
var paths = require('./paths');
var env = require('./env');

// We use "homepage" field to infer "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
// var homepagePath = require(paths.appPackageJson).homepage;
// var publicPath = homepagePath ? url.parse(homepagePath).pathname : '/';
// if (!publicPath.endsWith('/')) {
//   // If we don't do this, file assets will get incorrect paths.
//   publicPath += '/';
// }

var publicPath =  '/';

module.exports = {
  bail: true,
  debug: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: 'source-map',
  color: true,
  progress: true,

  entry: [
    require.resolve('./polyfills'),
    path.join(paths.appSrc, 'app'),
  ],

  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath,
  },

  resolve: {
    moduleDirectories: ['node_modules', 'src'],
    extensions: ['.js', '.json', '', '.jsx', '.scss'],
  },

  resolveLoader: {
    root: paths.ownNodeModules,
    moduleTemplates: ['*-loader'],
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: paths.appSrc,
      },
    ],

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
        loader: 'json',
      },
      {
        test: /\.(ico|jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        exclude: /\/favicon.ico$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },

      {
        test: /\/favicon.ico$/,
        include: [paths.appSrc],
        loader: 'file',
        query: {
          name: 'favicon.ico?[hash:8]',
        },
      },

      {
        test: /\.(mp4|webm)(\?.*)?$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.html$/,
        loader: 'html',
        query: {
          attrs: ['link:href'],
        },
      },
    ],
  },

  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true
      // }
    }),

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    new webpack.DefinePlugin(env),

    // This helps ensure the builds are consistent if source hasn't changed:
    // new webpack.optimize.OccurrenceOrderPlugin(),
    //
    // // Try to dedupe duplicated modules, if any:
    // new webpack.optimize.DedupePlugin(),
    //
    // // Minify the code.
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     screw_ie8: true,
    //     warnings: false
    //   },
    //   mangle: {
    //     screw_ie8: true
    //   },
    //   output: {
    //     comments: false,
    //     screw_ie8: true
    //   }
    // }),

    new ExtractTextPlugin('static/css/[name].[contenthash:8].css'),
  ],
};
