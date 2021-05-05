const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'js/app': './src/app.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.art$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'art-template-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        // 从后往前解析
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
      inject: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public/*.png',
          to: path.join(__dirname, './dist/img.png'),
        },
        {
          from: './public/libs',
          to: path.join(__dirname, './dist/libs'),
        }
      ]
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }
}
