/**
 * Mock 模拟器入口
 * @author LiQingSong
 * 文档：http://mockjs.com/
 */
import Mock from 'mockjs';

let mocks = [];
// 使用 webpack 的 require.context() 遍历所有 mock 文件
const files = require.context('.', true, /\.js$/);
files.keys().forEach((key) => {
  if (key === './index.js') return;
  mocks = mocks.concat(files(key).default);
});


// 注册所有的 mock 服务
mocks.forEach((item) => {
    // console.log(item);
    Mock.mock(new RegExp(`${item.url}`), item.type || 'get', item.response);
});

