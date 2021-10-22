import { validate } from "schema-utils";
// const globby = require("globby");
import { globby } from "globby";
import path from "path";
import webpack from "webpack";

// 使用readFileSync测试
import { readFile } from "fs/promises";

const { RawSource } = webpack.sources;

const schema = {
  type: "object",
  properties: {
    from: { type: "string" },
    to: { type: "string" },
    ignore: { type: "array" },
  },
  additionalProperties: true,
};

export default class CopyWebpackPlugin {
  constructor(options = {}) {
    // 验证插件的options是否符合schema
    validate(schema, options, {
      name: "CopyWebpackPlugin",
    });

    this.options = options;
  }

  apply(compiler) {
    // 初始化compilation
    compiler.hooks.thisCompilation.tap("CopyWebpackPlugin", (compilation) => {
      // 添加资源的钩子函数
      compilation.hooks.additionalAssets.tapAsync(
        "CopyWebpackPlugin",
        async (cb) => {
          // 将from中的文件复制到to中，输出
          const { from, to = ".", ignore } = this.options;

          const ignoreArr = ignore.map((i) => `!**/${i}`);

          // 1. 过滤掉ignore中的文件;
          // 将输入的路径变为绝对路径，排除index.html
          // process.cwd() 表示当前程序的运行目录; compiler.options.context 也可以
          const paths = await globby([
            path.resolve(process.cwd(), from),
            ...ignoreArr,
          ]);
          console.log("paths :>> ", paths); // 所有需要处理的文件路径数组
          // 2. 读取 paths 中的所有资源
          const files = await Promise.all(
            paths.map(async (p) => {
              const content = await readFile(p);
              const filename = path.basename(p);

              return {
                // 文件内容
                content,
                // 文件名称
                filename,
              };
            })
          );
          // 3. 生成webpack格式的资源;
          const assets = files.map(({ content, filename }) => {
            const source = new RawSource(content);
            return {
              filename,
              source,
            };
          });
          // 4. 将资源添加到compilation中，进行输出;
          assets.forEach(({ source, filename }) => {
            // to 指定最终资源输出的文件夹
            compilation.emitAsset(path.join(to, filename), source);
          });

          cb();
        }
      );
    });
  }
}
