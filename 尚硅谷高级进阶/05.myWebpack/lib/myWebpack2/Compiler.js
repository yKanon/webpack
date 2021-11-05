const { getAst, getCode, getDeps } = require('./parser.js')

module.exports = class Compiler {
  constructor(options = {}) {
    this.options = options;
  }

  // 启动 webpack 打包
  run() {
    // 入口文件路径
    const filePath = this.options.entry
    const ast = getAst(filePath)
    const deps = getDeps(ast, filePath)
    const code = getCode(ast)

    console.log('ast :>> ', ast);
    console.log('deps :>> ', deps);
    console.log('code :>> ', code);
  }
}
