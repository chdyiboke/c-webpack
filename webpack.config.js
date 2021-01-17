const path = require('path');
const MyPlugin = require('./plugins/MyPlugin');
const FileListPlugin = require('./plugins/FileListPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports ={
  mode: 'production',
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
      }
    ],
  },
  plugins:[
    new MyPlugin(),
    new FileListPlugin({filename: '_filelist.md'}),
    // 渲染首页
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}