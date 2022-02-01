module.exports = class DecideHtmlPlugin {
  constructor() { }

  apply(compiler) {
    compiler.hooks.afterPlugins.tap('DecideHtmlPlugin', (compiler) => {
      const plugins = compiler.options.plugins
      const hasHtmlPlugin = plugins.some(plugin => plugin.__proto__.constructor.name === 'HtmlWebpackPlugin')

      if (hasHtmlPlugin) {
        console.log(`使用了html-webpack-plugin`)
      }
    })
  }
}