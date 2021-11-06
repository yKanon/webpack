const { getAst, getCode, getDeps } = require('./parser.js')

module.exports = class Compiler {
  constructor(options = {}) {
    this.options = options;
  }

  // 启动 webpack 打包
  run() {
    // 入口文件路径
    const filePath = this.options.entry
    // 1. 将文件解析成 ast
    const ast = getAst(filePath)
    // 2. 获取 ast 中的所有依赖
    const deps = getDeps(ast, filePath)
    // 3. 将 ast 转化成 code
    const code = getCode(ast)

    console.log('ast :>> ', ast);
    console.log('deps :>> ', deps);
    console.log('code :>> ', code);
  }
}
