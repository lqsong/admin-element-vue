/**
 * 用户 Mock 数据
 * @author LiQingSong
 */

const tokens = {
    admin: {
      token: 'admin-token'
    },
    test: {
      token: 'test-token'
    }
};
  
export default [
    // 用户登录
    {
        url: '/user/login',
        type: 'post',
        response: options => {
          const { username } = options.body;
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
            data: {
                token
            }
          };
        }
    },
    // 获取用户信息
    {
        url: '/user/info',
        type: 'get',
        response: () => {
            return {
                code: 200,
                data: {
                    roles: ['admin'],
                    name: '王小二',
                    avatar: "https://cn.vuejs.org/images/logo.png"
                }
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