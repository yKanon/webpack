const PluginTest = require("./plugins/PluginTest");
const Plugin2 = require("./plugins/Plugin2");

module.exports = {
  plugins: [
    // new PluginTest()
    new Plugin2(),
  ],
};
