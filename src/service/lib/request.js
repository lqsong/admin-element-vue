/** 
 * 重置 axios
 * @author LiQingSong
 */
import router from '@/router';
import store from '@/store';
import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import { ajaxHeadersTokenKey, siteLoginRouter, serverLoginUrl, ajaxResponseNoVerifyUrl } from '@/settings';
import { isExternal } from '@/utlis/validate';

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_APIHOST, // url = api url + request url
  withCredentials: true, // 当跨域请求时发送cookie
  timeout: 0 // 请求超时时间,5000(单位毫秒) / 0 不做限制
});

// 全局设置 - post请求头
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器 - 在发送请求之前
service.interceptors.request.use(
  config => {

    // 如果设置了cType 说明是自定义 添加 Content-Type类型 为自定义post 做铺垫
    if (config.cType) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    

    // 请根据实际情况修改
    if (store.getters.token) {
      // store.getters.token 加载时已在 [store/user] 用 getToken()获取Token
      // 让每个请求携带令牌
      // ajaxHeadersTokenKey -> ['X-Token'] 是自定义头key
      config.headers[ajaxHeadersTokenKey] = store.getters.token
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
);

// 响应拦截器
service.interceptors.response.use(
  
  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 您还可以通过HTTP状态码来判断状态
   */
  response => {
    const res = response.data;
    const { code } = res;

    // 如果自定义代码不是200，则判断为错误。
    if (code !== 200) {
      // 获取替换后的字符串
      const reqUrl = response.config.url.replace(response.config.baseURL, '');
      const noVerifyBool = ajaxResponseNoVerifyUrl.includes(reqUrl);
      
      switch (code) {
        case 401: // 未登陆

            if (!noVerifyBool) {
              MessageBox({
                title: '提示',
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                message: '当前用户登入信息已失效，请重新登入再操作',
                beforeClose: (action, instance, done) => {
                  window.location.href = serverLoginUrl;
                  if (isExternal(serverLoginUrl)) {
                      window.location.href = serverLoginUrl;
                  } else {
                      router.next(siteLoginRouter + "?redirect=" + router.fullPath);
                  }
                  console.log(action, instance, done);
                }
              })
            }
            
            break;
      
        default:
            if (!noVerifyBool) {
              Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
              })
            }
            break;
      }

      // return Promise.reject(new Error(res.msg || 'Error'))
      return res;
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
);

/** 
 * 原 Axios 返回
 * 
 * Method: get
 *     Request Headers
 *         无 - Content-Type
 *     Query String Parameters
 *         name: name
 *         age: age
 * 
 * Method: post
 *     Request Headers
 *         Content-Type:application/json;charset=UTF-8
 *     Request Payload
 *         { name: name, age: age }
 *         Custom parameters
 *             { cType: true }  Mandatory Settings Content-Type:application/json;charset=UTF-8
 * ......
 */
export default service;
