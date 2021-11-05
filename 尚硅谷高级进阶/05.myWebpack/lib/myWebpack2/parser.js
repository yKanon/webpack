const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

module.exports = {
  getAst(filePath) {
    const file = fs.readFileSync(filePath, 'utf-8')

    // 将其解析为 ast 
    const ast = babelParser.parse(file, {
      sourceType: 'module' // 解析文件的模块化方案是 esm
    })

    return ast
  },
  getDeps(ast, filePath) {
    // 获取文件的文件夹路径
    const dirname = path.dirname(filePath)
    // 定义存储依赖的容器
    const deps = {}

    // 收集依赖
    traverse(ast, {
      // 内部会遍历 ast 中的 program.body。判断里面的语句类型
      // 当 type 为 ImportDeclaration 时，触发函数
      ImportDeclaration({ node }) {
        // 文件的相对路径 ./add.js
        const relativePath = node.source.value
        // 基于文件的相对路径生成绝对路径
        const absolutePath = path.resolve(dirname, relativePath)
        // 添加依赖
        deps[relativePath] = absolutePath
      }
    })

    return deps
  },
  getCode(ast) {
    // 转译代码：将浏览器不能识别的语法进行转移
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })

    return code
  }
}