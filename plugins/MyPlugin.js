class MyPlugin{
  // 注册了 Compiler 上的异步串行钩子 done，在钩子中注入了一条控制台打印的语句。
  // done 会在一次编译完成后执行。所以这个插件会在每次打包结束，向控制台首先输出
  apply(compiler){
    compiler.hooks.done.tap('MyPlugin', (stats)=>{
      console.log('MyPlugin!');
    });
  }
}

module.exports = MyPlugin;
