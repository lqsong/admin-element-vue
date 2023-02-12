/**
 * @description: 自定义 token 操作
 * @author LiQingSong
 */
import { siteTokenKey } from "@/config/settings";

/**
 * @description: 获取本地Token
 */
export const getToken = () => localStorage.getItem(siteTokenKey);

/**
 * @description: 设置存储本地Token
 */
export const setToken = (token: string) => {
	localStorage.setItem(siteTokenKey, token);
};

/**
 * @description: 移除本地Token
 */
export const removeToken = () => {
	localStorage.removeItem(siteTokenKey);
};
