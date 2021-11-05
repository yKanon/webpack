// const myWebpack = require('../lib/myWebpack/index.js')
const myWebpack = require('../lib/myWebpack2/index.js')
const config = require('../config/webpack.config.js')


const compiler = myWebpack(config)

// webpack 开始打包
compiler.run()
