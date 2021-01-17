# Plugin(插件)

Plugin(插件) 是 webpack 生态的的一个关键部分。它为社区提供了一种强大的方法来扩展 webpack 和开发 webpack 的编译过程。本文将尝试探索 webpack plugin，揭秘它的工作原理，以及如何开发一个 plugin。

## 一、Plugin 的作用
关于 Plugin 的作用，引用一下 webpack 官方的介绍：

Plugins expose the full potential of the webpack engine to third-party developers. Using staged build callbacks, developers can introduce their own behaviors into the webpack build process.

我把它通俗翻译了下：
我们可以通过插件，扩展 webpack，加入自定义的构建行为，使 webpack 可以执行更广泛的任务，拥有更强的构建能力。

## 二、Plugin 工作原理
webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。

插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。webpack 通过 Tapable 来组织这条复杂的生产线。 webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。

webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。
——「深入浅出 Webpack」

站在代码逻辑的角度就是：webpack 在编译过代码程中，会触发一系列 Tapable 钩子事件，插件所做的，就是找到相应的钩子，往上面挂上自己的任务，也就是注册事件，这样，当 webpack 构建的时候，插件注册的事件就会随着钩子的触发而执行了。


## 三、webpack 的一些底层逻辑
### webpack 内部执行流程
一次完整的 webpack 打包大致是这样的过程：

    将命令行参数与 webpack 配置文件 合并、解析得到参数对象。
    参数对象传给 webpack 执行得到 Compiler 对象。
    执行 Compiler 的 run方法开始编译。每次执行 run 编译都会生成一个 Compilation 对象。
    触发 Compiler 的 make方法分析入口文件，调用 compilation 的 buildModule 方法创建主模块对象。
    生成入口文件 AST(抽象语法树)，通过 AST 分析和递归加载依赖模块。
    所有模块分析完成后，执行 compilation 的 seal 方法对每个 chunk 进行整理、优化、封装。
    最后执行 Compiler 的 emitAssets 方法把生成的文件输出到 output 的目录中。
webpack 底层基本流程图

![webpack](https://champyin.com/images/webpack-basic-flow.png)

Tapable 还统一暴露了三个方法给插件，用于注入不同类型的自定义构建行为：

tap：可以注册同步钩子和异步钩子。(compiler.hooks.done.tap)
tapAsync：回调方式注册异步钩子。
tapPromise：Promise方式注册异步钩子。

### Compiler Hooks
Compiler 编译器模块是创建编译实例的主引擎。大多数面向用户的插件都首先在 Compiler 上注册。

compiler上暴露的一些常用的钩子：


    钩子	类型	什么时候调用
    run	AsyncSeriesHook	在编译器开始读取记录前执行
    compile	SyncHook	在一个新的compilation创建之前执行
    compilation	SyncHook	在一次compilation创建后执行插件
    make	AsyncParallelHook	完成一次编译之前执行
    emit	AsyncSeriesHook	在生成文件到output目录之前执行，回调参数： compilation
    afterEmit	AsyncSeriesHook	在生成文件到output目录之后执行
    assetEmitted	AsyncSeriesHook	生成文件的时候执行，提供访问产出文件信息的入口，回调参数：file，info
    done	AsyncSeriesHook	一次编译完成后执行，回调参数：stats
### Compilation Hooks

Compilation 是 Compiler 用来创建一次新的编译过程的模块。一个 Compilation 实例可以访问所有模块和它们的依赖。在一次编译阶段，模块被加载、封装、优化、分块、散列和还原。
Compilation 也继承了 Tapable 并提供了很多生命周期钩子。

Compilation 上暴露的一些常用的钩子：


## JavascriptParser Hooks
Parser 解析器实例在 Compiler 编译器中产生，用于解析 webpack 正在处理的每个模块。我们可以用它提供的 Tapable 钩子自定义解析过程。


```
asset index.js 2.05 KiB [emitted] (name: index)
asset a.js 2.02 KiB [emitted] (name: a)
asset _filelist.md 30 bytes [emitted]
./src/index.js 52 bytes [built] [code generated]
./src/a.js 45 bytes [built] [code generated]
webpack 5.15.0 compiled successfully in 91 ms
======================
MyPlugin!
asset index.js 2.05 KiB [emitted] (name: index)
asset a.js 2.02 KiB [emitted] (name: a)
asset _filelist.md 48 bytes [emitted]
./src/index.js 52 bytes [built] [code generated]
./src/a.js 45 bytes [built] [code generated]
webpack 5.15.0 compiled successfully in 91 ms
```



