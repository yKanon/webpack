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
    this.modules.unshift(fileInfo)


    // 将依赖数组转为对象的格式，从而整理出更好的依赖关系图
    /**
      {
        'index.js': {
          code: 'xxx',
          deps: {
            './add.js': absolutePath
          }
        },
        "add.js": {
          code: 'xxx',
          deps: {
            
          }
        }
      }
     */
    const depsGraph = this.modules.reduce((graph, module) => {
      return {
        ...graph,
        [module.filePath]: {
          code: module.code,
          deps: module.deps
        },
      }
    }, {})
    // console.log('this.modules :>> ', this.modules);
    console.log('depsGraph :>> ', depsGraph);
  }

  build(filePath) {
    // 1. 将文件解析成 ast
    const ast = getAst(filePath)
    // 2. 获取 ast 中的所有依赖
    const deps = getDeps(ast, filePath)
    // 3. 将 ast 转化成 code
    const code = getCode(ast)

    for (const relativePath in deps) {
      const absolutePath = deps[relativePath];
      const fileInfo = this.build(absolutePath)
      this.modules.push(fileInfo)
    }

    return {
      filePath,
      deps,
      code
    }
  }
}
