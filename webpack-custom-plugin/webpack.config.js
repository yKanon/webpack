const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// const No1WebpackPlugin = require("./plugins/No1-webpack-plugin")
// const No2WebpackPlugin = require("./plugins/No2-webpack-plugin")
// const FileListPlugin = require("./plugins/File-list-plugin")
// const WatchWebpackPlugin = require("./plugins/Watch-webpack-plugin")
// const DecideHtmlPlugin = require("./plugins/Decide-html-plugin")
const CleanPlugin = require("./plugins/Clean-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: [
    "./src/index.js",
    "./src/index.css"
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'custom-plugin'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    // new CleanWebpackPlugin(),
    // new No1WebpackPlugin({ msg: 'hello boy!' }),
    // new No2WebpackPlugin({ msg: 'hello boy!' }),
    // new FileListPlugin(),
    // new WatchWebpackPlugin(),
    // new DecideHtmlPlugin(),
    new CleanPlugin(),
  ]
}