module.exports = class WatchWebpackPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.watchRun.tapAsync('WatchWebpackPlugin', (compiler, cb) => {
      console.log(`我时刻监听着����`)
      let mtimes = compiler.watchFileSystem.watcher.mtimes
      let mtimesKeys = Object.keys(mtimes)

      if (mtimesKeys.length > 0) {
        console.log(`本次一共改动了${mtimesKeys.length}个文件,目录为:`)
        console.log(mtimesKeys)
        console.log('------------分割线-------------')
      }
      cb()
    })

    compiler.hooks.watchClose.tap('WatchWebpackPlugin', () => {
      console.log(`本次监听到此结束~~~`)
    })
  }
}