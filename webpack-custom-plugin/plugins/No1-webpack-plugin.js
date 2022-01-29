module.exports = class No1WebpackPlugin {
  constructor (options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync('No1WebpackPlugin', (_stats) => {
      console.log(this.options.msg)
    })
  }
}