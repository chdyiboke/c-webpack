/**
 * 1. V5解析器已经支持 exports 和 imports 字段等功能。
 * https://juejin.cn/post/6882663278712094727
 * 
 * 2. 预设 @babel/preset-env
 * @babel/plugin-transform-runtime
 * https://zhuanlan.zhihu.com/p/43249121
 * 
 * 3. babel-loader 在代码混淆之前解析，效率更高，babel-loader 也会读取 babel中的配置 段作为自己的配置，之后的内核处理也是相同。
 * module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }
  ]
}
 */
module.exports = {
  presets: [
    "@babel/preset-env",
    '@babel/preset-react',
  ],
  plugins: [
    // ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
