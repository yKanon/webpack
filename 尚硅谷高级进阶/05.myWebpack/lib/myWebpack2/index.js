const Compiler = require('./Compiler.js')

module.exports = function myWebpack(config) {
  return new Compiler(config)
}
