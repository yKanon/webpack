const { getAst, getCode, getDeps } = require('./parser.js')

module.exports = class Compiler {
  constructor(options = {}) {
    // webpack 的配置对象
    this.options = options;
    // 所有依赖的容器
    this.modules = []
  }

  // 启动 webpack 打包
  run() {
    // 入口文件路径
    const filePath = this.options.entry
    const fileInfo = this.build(filePath)
    this.modules.push(fileInfo)

    this.modules.forEach(fileInfo => {
      const deps = fileInfo.deps

      for (const relativePath in deps) {
        const absolutePath = deps[relativePath];
        const fileInfo = this.build(absolutePath)
        this.modules.push(fileInfo)
      }
    })

    console.log('this.modules :>> ', this.modules);
  }

  build(filePath) {
    // 1. 将文件解析成 ast
    const ast = getAst(filePath)
    // 2. 获取 ast 中的所有依赖
    const deps = getDeps(ast, filePath)
    // 3. 将 ast 转化成 code
    const code = getCode(ast)


    return {
      filePath,
      deps,
      code
    }
  }
}
