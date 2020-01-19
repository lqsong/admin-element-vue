import request from '@/service/lib/request';

/**
 * 用户 - 登录
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @author LiQingSong
 */
export function login(url, data) {
    return request({
      url: url,
      method: 'post',
      data
    })
}

/**
 * 用户 - 获取用户信息和权限
 * @author LiQingSong
 */
export function getInfo() {
    /* return request({
      url: '/user/info',
      method: 'get'
    }) */
    return new Promise((resolve) => {
        resolve({
            'data': {
                token: '',
                roles: ['admin'],
                name: '王小二',
                avatar: "https://cn.vuejs.org/images/logo.png"
            }
        });
    })
}

/**
 * 用户 - 退出
 * @author LiQingSong
 */
export function logout(url) {
    return request({
      url: url,
      method: 'post'
    })
}