class MyWebpackPlugin {
  apply(compiler) {
    // compiler.hooks.done.tap('My Plugin', stats => {
    //   console.log('MyPlugin: done');
    // })
    compiler.plugin('emit', (compilation, callback) => {
      const source = compilation.assets['main.js'].source();

      compilation.assets['main.js'].source = () => {
        const banner = [
          '/**',
          ' * 이것은 BannerPlugin이 처리한 결과입니다.',
          ' * Build Date: 2020-04-27',
          ' */'
        ].join('\n');
        return banner + '\n\n' + source;
      };
      
      callback();
    })
  }
}

module.exports = MyWebpackPlugin;