module.exports = class No2WebpackPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.compile.tap('No2', (compilationParams) => {
      console.log('compile')
    })

    compiler.hooks.compilation.tap('No2', (compilation, compilationParams) => {
      console.log('compilation')
      compilation.hooks.chunkAsset.tap('No2', (chunk, filename) => {
        console.log(`chunk::=====>>`, chunk)
        console.log(`filename::=====>>`, filename)
      })
    })
  }
}