const { getAst, getCode, getDeps } = require('./parser.js')
const fs = require('fs');
const path = require('path');

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
    // console.log('depsGraph :>> ', depsGraph);

    this.generate(depsGraph)
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

  // 生成输出资源
  generate(depsGraph) {
    /** index.js 的代码 
      "use strict";\n' +
      '\n' +
      'var _add = _interopRequireDefault(require("./add.js"));\n' +
      '\n' +
      'var _count = _interopRequireDefault(require("./count.js"));\n' +
      '\n' +
      'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
      '\n' +
      '(0, _add["default"])(2, 3);\n' +
      '(0, _count["default"])(4, 2);'
     */
    const bundle = `
      (function(depsGraph) {
        // 输出文件首次调用的 require 函数。目的是加载入口文件
        function require(module) {
          // 定义暴露对象：将来我们模块要暴露的内容
          const exports = {}
          // 定义模块内部的 require 函数
          function localRequire(relativePath) {
            return require(depsGraph[module].deps[relativePath])
          }

          (function(require, exports, code) {
            eval(code)
          })(
            localRequire,
            exports,
            depsGraph[module].code
          )

          // require 函数的返回值，使得后面的 require 函数能得到暴露的内容
          return exports
        }

        // 加载入口文件
        require('${this.options.entry}')
      })(${JSON.stringify(depsGraph)})
    `

    // 生成输出文件的绝对路径
    const filePath = path.resolve(this.options.output.path, this.options.output.filename)
    // 写入文件
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}
