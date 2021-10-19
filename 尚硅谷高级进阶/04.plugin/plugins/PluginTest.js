module.exports = class PluginTest {
  apply(compiler) {
    compiler.hooks.emit.tap("PluginTest", function (compilation) {
      console.log("hooks emit");
    });
    compiler.hooks.emit.tapAsync(
      "PluginTest",
      function (compilation, callback) {
        setTimeout(() => {
          console.log("hooks emit sto");
          callback();
        }, 1000);
      }
    );
    compiler.hooks.afterEmit.tapPromise("PluginTest", function (compilation) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("hooks after emit promise");
          resolve();
        }, 1000);
      });
    });
    compiler.hooks.afterEmit.tap("PluginTest", function (compilation) {
      console.log("hooks after emit");
    });
    compiler.hooks.done.tap("PluginTest", function (stats) {
      console.log("hooks done");
    });
  }
};
