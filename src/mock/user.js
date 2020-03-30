/**
 * 用户 Mock 数据
 * @author LiQingSong
 */
import { getQueryValue } from '@/utlis/url';

const tokens = {
    admin: {
      token: 'admin-token'
    },
    test: {
      token: 'test-token'
    }
};
const users = {
  'admin-token': {
    roles: ['admin'],
    avatar: '',
    name: 'Admin',
    msgtotal: 100
  }
};
  
export default [
    // 用户登录
    {
        url: '/user/login',
        type: 'post',
        response: options => {
          const body = JSON.parse(options.body);
          const { username } = body;
          const token = tokens[username];

          // mock error
          if (!token) {
            return {
              code: 201,
              msg: '无此账号'
            };
          }
    
          return {
            code: 200,
            data: token
          };
        }
    },
    // 获取用户信息
    {
        url: '/user/info.*',
        type: 'get',
        response: options => {

          const token = getQueryValue(options.url, 'token');
          const info = users[token];
          
          // mock error
          if (!info) {
            return {
              code: 500,
              msg: '登录信息失效，无法获取用户信息。'
            };
          }

          return {
              code: 200,
              data: info
          };


        }
    },
    // 用户退出
    {
        url: '/user/logout',
        type: 'post',
        response: () => {
          return {
            code: 200,
            msg: '退出成功'
          };
        }
    }
];