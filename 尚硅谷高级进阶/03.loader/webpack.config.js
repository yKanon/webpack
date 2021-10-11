const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: [
        //   "loader3",
        //   "loader2",
        //   {
        //     loader: "loader1",
        //     options: {
        //       name: "wss",
        //     },
        //   },
        // ],
        loader: "babelLoader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  // 配置loader的解析规则
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "loaders")],
  },
};
