const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'index.ts')
  },

  module: {
    rules: [
      { test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/]} },
      { test: /\.vue$/, exclude: /node_modules/, use: 'vue-loader' },
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(ttf|woff|woff2|eot|svg)$/, use: 'file-loader' },
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 8000
  },

  devtool: 'sourcemap',

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    })
  ]
}