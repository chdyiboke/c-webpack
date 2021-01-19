# c-webpack
webpack熟练使用。
## npm init


##  创建 weback 配置
npm i webpack && npm i webpack-cli


## webpack-babel-loader、dev-server、optimization、模块联合、dll

### babel-loader

module.exports = {
  presets: [
    "@babel/preset-env"
    // require.resolve('@babel/preset-env'),
  ],
  plugins: [
    // [require.resolve('@babel/plugin-transform-runtime'), { corejs: 3 }],
  ],
};



"scripts": {
  "start:dev": "webpack serve"
}

### optimization

使用terser来缩小JavaScript。webpack v5，无需安装此插件，自带。
const TerserJSPlugin = require('terser-webpack-plugin');

```javascript
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(parallel: 4)], // 启用多进程并行运行并设置并发运行次数。
  },
}
```
webpack打包时自动去除console.log——terser/terser-webpack-plugin
terser
由于老牌工具uglify不支持es6，且uglify-es不再更新。



optimize-css-assets-webpack-plugin

该插件使用cssnano优化和缩小CSS。
但是使用查询字符串对源映射和资产更准确时，它可以缓存并在并行模式下工作。

仅在生产模式下启用CSS优化。如果要在开发中也运行它，请将optimization.minimize选项设置为true。


### ModuleFederationPlugin
模块联合：让不同项目的模块可以通过远程提供给其它项目使用。  

通常微前端。

共享模块是既可覆盖又可作为嵌套容器的替代提供的模块。它们通常指向每个构建中的相同模块，例如相同的库。

该插件结合了ContainerPlugin和ContainerReferencePlugin。覆盖和可覆盖组合到指定共享模块的单个列表中。

shared: ['react', 'react-dom'],

Remote 配置：
```
//webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  ...
   devServer: {
    port: 8080
  },
  plugins: [
    new ModuleFederationPlugin({
       name:'remoteVar', //必须，唯一 ID，作为输出的模块名，使用的时通过 ${name}/${expose} 的方式使用；
       filename:'remoteEntry.js', // 构建出来的文件名
       exposes:{ //可选，表示作为 Remote 时，export 哪些属性被消费；
           './NewsList':'./src/NewsList'
       },
       shared:['react','react-dom'] //可选，优先用 Host 的依赖，如果 Host 没有，再用自己的；
    })
  ]
}

```

Host 配置：
```
//webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  ...
  devServer: {
    port: 8081
  },
  plugins: [
    new ModuleFederationPlugin({
       remotes:{ //可选，表示作为 Host 时，去消费哪些 Remote；
           remote:'remoteVar@http://localhost:8080/remoteEntry.js'
           hostRemote:'hostRemoteVar@http://localhost:8082/remoteEntry.js'
       },
       shared:['react','react-dom']    
    })
  ]
}

```
作者：舜岳
链接：https://juejin.cn/post/6910764120698519560
来源：掘金


### DLL（Dynamic Link Libray
实现共享函数库的一种方式

往往会用到很多公共库，公共库的内容不同于业务代码，在很长的一个时间周期内都不会有改动。这部分公共库通常会被打包在commonChunk中，还是会更新。所以利用 DllPlugin 插件，把这些包单独打包到一个文件，缓存起来。可以大大减小打包时间。

vendors_dll.js
```
new webpack.DllPlugin({
  path: path.join(config.path.public, '../[name]-manifest.json'),
  name: '[name]_library',
  context: config.path.root,
}),

```