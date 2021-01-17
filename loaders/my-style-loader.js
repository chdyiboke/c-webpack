// module.exports = function (source) {
//   const cssSource = source.match(/(?<=__CSS_SOURCE__)((.|\s)*?)(?=\*\/)/g); //获取 css 资源字符串
//   const classKeyMap = source.match(/(?<=__CSS_classKeyMap__)((.|\s)*?)(?=\*\/)/g); // 获取 css 类名Map
//   let script = `var style = document.createElement('style');   
//   style.innerHTML = ${JSON.stringify(cssSource)};
//   document.head.appendChild(style);
//   `;
//   if (classKeyMap !== null) {
//       script += `module.exports = ${classKeyMap}`;
//   }
//   return script;
// };

const loaderUtils = require('loader-utils');
module.exports = function(source) {
    // do nothing
}

module.exports.pitch = function(remainingRequest) {
  console.log('my-style-loader is working');
    // 在 pitch 阶段返回脚本
    return (
      `
      // 创建 style 标签
      let style = document.createElement('style');
      /**
      * 利用 remainingRequest 参数获取 loader 链的剩余部分
      * 利用 ‘!!’ 前缀跳过其他 loader 
      * 利用 loaderUtils 的 stringifyRequest 方法将模块的绝对路径转为相对路径
      * 将获取 css 的 require 表达式赋给 style 标签
      */
      style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)}).default[0][1];
      // 将 style 标签插入 head
      document.head.appendChild(style);
      `
    )
}
