const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const No1WebpackPlugin = require("./plugins/No1-webpack-plugin")
const No2WebpackPlugin = require("./plugins/No2-webpack-plugin")
const FileListPlugin = require("./plugins/File-list-plugin")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'custom-plugin'
    }),
    new CleanWebpackPlugin(),
    // new No1WebpackPlugin({ msg: 'hello boy!' }),
    // new No2WebpackPlugin({ msg: 'hello boy!' }),
    new FileListPlugin(),
  ]
}