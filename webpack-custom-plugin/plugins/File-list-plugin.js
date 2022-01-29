

module.exports = class FileListPlugin {
  constructor(options = {
    filename: 'filelist.md'
  }) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, cb) => {
      const { RawSource } = compiler.webpack.sources
      const { filename } = this.options
      const assets = compilation.assets
      // console.log(`compilation::=====>>`, compilation.assets)
      const length = Object.keys(assets).length
      let content = `# 一共有 ${length} 个文件\n\n`

      for (const file in assets) {
        content += `- ${file}\n`
      }

      // compilation.updateAsset(filename, content)
      compilation.emitAsset(filename, new RawSource(content))
      // compilation.assets[filename] = {
      //   source() {
      //     return content
      //   },
      //   size() {
      //     return content.length
      //   }
      // }
      cb()
    })
  }
}