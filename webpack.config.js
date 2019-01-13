const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
module.exports = {
  mode: 'development',
  entry: {
    app: './client/index.ts',
    styles: './client/styles.scss'
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'client'),
    filename: 'js/[name].bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist', 'client'),
    compress: true,
    host: '127.0.0.1',
    port: 3200,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: true
      },
      '/auth': {
        target: 'http://localhost:3000',
        secure: true
      },
      '/': {
        target: 'http://localhost:3000',
        secure: true
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: '/node_modules/',
        loader: 'babel-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.(scss)$/,
        exclude: '/node_modules/',
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client', 'index.html')
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
