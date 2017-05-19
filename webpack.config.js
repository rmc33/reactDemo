var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname);
var APP_DIR = path.resolve(__dirname, 'app');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  entry: {
    'app-test-redux': path.resolve(APP_DIR, 'testRedux.js'),
    'app-test-highcharts': path.resolve(APP_DIR, 'index.js')
  },
  output: {
    path: BUILD_DIR + '/js',
    filename: "[name].js",
    publicPath: '',
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      "testAMD": APP_DIR + '/components/testAMD',
      "jquery": path.resolve(__dirname, "node_modules", "jquery", "dist", "jquery")
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("bootstrap.css"),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module : {
	  loaders: [
	      {
          test: /.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-stage-0')
            ]
          }
        },
        {
            test: /\.less$/,
            loaders: [ 'style-loader', 'css-loader', 'less-loader' ]
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader')
        },
        { 
          test: /\.png$/, 
          loader: "url-loader?limit=100000" 
        },
        { 
          test: /\.jpg$/, 
          loader: "file-loader" 
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'file'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url?limit=10000&mimetype=image/svg+xml'
        }
     ]
  }
};

module.exports = config;
