const path = require("path");
const fs = require("fs")

const union = require('lodash.union')
const recursiveReadSync = require('recursive-readdir-sync')
const minimatch = require('minimatch')

// TODO: 待完善
module.exports = class CleanPlugin {
  constructor() { }

  // 匹配文件
  getUnmatchFiles(fromPath, exclude = []) {
    const unmatchFiles = recursiveReadSync(fromPath).filter(file =>
      exclude.every(
        excluded => {
          return !minimatch(path.relative(fromPath, file), path.join(excluded), {
            dot: true
          })
        }
      )
    );
    return unmatchFiles;
  }

  apply(compiler) {
    const outputPath = compiler.options.output.path

    compiler.hooks.done.tapAsync('CleanPlugin', (stats) => {
      if (compiler.outputFileSystem.constructor.name !== "NodeOutputFileSystem") {
        return;
      }
      const assets = stats.toJson().assets.map(asset => asset.name);
      // 多数组合并并且去重
      const newAssets = union(this.options.exclude, assets);
      // 获取未匹配文件
      const unmatchFiles = this.getUnmatchFiles(outputPath, newAssets);
      // 删除未匹配文件
      unmatchFiles.forEach(fs.unlinkSync);
    })
  }
}