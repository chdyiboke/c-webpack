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
    path: path.resolve(__dirname, 'dist')
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
  },
  plugins:[
    new MyPlugin(),
    new FileListPlugin({filename: '_filelist.md'}),
    new ModuleFederationPlugin({
      name: "APP_NAME",
      filename: 'remoteEntry.js',
      library: { type: 'var', name: "APP_NAME" },
      remotes: {
         m1: "m1",
         m2: "m2",
         m3: 'm3',
      },
      shared: ['react', 'react-dom'],
    }),
    // 渲染首页
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}