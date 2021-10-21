// const PluginTest = require("./plugins/PluginTest");
// const Plugin2 = require("./plugins/Plugin2");
import CopyWebpackPlugin from "./plugins/CopyWebpackPlugin.js";

export default {
  plugins: [
    // new PluginTest()
    // new Plugin2(),
    new CopyWebpackPlugin({
      from: "./public",
      // to: './dist',
      ignore: ["index.html"],
    }),
  ],
};
