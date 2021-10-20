const fs = require("fs");
const path = require("path");
const util = require("util");
const { RawSource } = require("webpack").sources;

// 将 fn 变成基于 promise 风格的异步方法
const readFile = util.promisify(fs.readFile);

module.exports = class Plugin2 {
  apply(compiler) {
    // 初始完成compilation的钩子
    compiler.hooks.thisCompilation.tap(
      "Plugin2",
      (compilation, compilationParams) => {
        // debugger;
        // console.log("compilation :>> ", compilation);

        const content = "hello plugin2";

        // 添加资源
        // 1.
        compilation.hooks.additionalAssets.tapAsync("Plugin2", async (cb) => {
          debugger;
          // console.log(compilation);

          // 向要输出的资源中，添加a.txt文件
          compilation.assets["a.txt"] = {
            size() {
              return content.length;
            },
            source() {
              return content;
            },
          };

          // 2.
          const data = await readFile(path.join(__dirname, "./b.txt"));
          compilation.assets["b.txt"] = new RawSource(data);

          // 3.
          compilation.emitAsset("c.txt", new RawSource(data));

          compilation.assets;

          cb();
        });
      }
    );
  }
};
