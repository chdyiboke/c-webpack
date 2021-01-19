const path = require('path');
const MyPlugin = require('./plugins/MyPlugin');
const FileListPlugin = require('./plugins/FileListPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;

module.exports ={
  mode: 'development', // production  development
  entry:{
    index: './src/index.js',
    // a: './src/a.js'
  },
  output:{
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },
  // 手动配置 loader 路径
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders'), 'node_modules']
  },
  module:{
    rules:[
      // {
      //   test: /\.js$/,
      //   use: ['simple-loader', 'simple-loader-with-pitch']
      // },
      {
        // 配置处理 css 的 loader
        test: /\.css$/,
        use: ['my-style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|bmp|gif)$/,
        use: 'my-file-loader'
      },{ 
        test: /\.js$/, use: 'babel-loader' 
      }
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
			chunks: "all",   // 共有3个值"initial"，"async"和"all"。配置后，代码分割优化仅选择初始块，按需块或所有块
			// minSize: 30000,   // （默认值：30000）块的最小大小
			// minChunks: 1,    // （默认值：1）在拆分之前共享模块的最小块数
			// maxAsyncRequests: 5,   //（默认为5）按需加载时并行请求的最大数量
			// maxInitialRequests: 3,  //（默认值为3）入口点的最大并行请求数
			// automaticNameDelimiter: '~',  // 默认情况下，webpack将使用块的来源和名称生成名称，例如vendors~main.js
			// name: 'common',
			cacheGroups: {  // 以上条件都满足后会走入cacheGroups进一步进行优化的判断
				commons: {
          name: 'common',
          chunks: 'all',
          minChunks: 2, // 两个以上入口文件共享的代码就会抽取到 common 中
        },
			}
    }
  },
  plugins:[
    new MyPlugin(),
    new FileListPlugin({filename: '_filelist.md'}),
    // new ModuleFederationPlugin({
    //   name: "APP_NAME",
    //   filename: 'remoteEntry.js',
    //   library: { type: 'var', name: "APP_NAME" },
    //   remotes: {
    //      m1: "m1",
    //      m2: "m2",
    //      m3: 'm3',
    //   },
    //   shared: ['react', 'react-dom'],
    // }),
    // 渲染首页
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}