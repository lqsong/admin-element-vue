import Cookies from 'js-cookie';
import { siteTokenKey } from '@/settings';

/** 
 * 获取本地Token
 * @author LiQingSong
 */
export function getToken() {
  return Cookies.get(siteTokenKey);
}

/** 
 * 设置存储Token
 * @author LiQingSong
 */
export function setToken(token) {
  return Cookies.set(siteTokenKey, token);
}

/** 
 * 移除本地Token
 * @author LiQingSong
 */
export function removeToken() {
  return Cookies.remove(siteTokenKey);
}