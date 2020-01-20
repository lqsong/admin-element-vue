/** 
 * 验证工具
 */

/**
 * 判断是否是外链
 * @param {string} path
 * @returns {Boolean}
 * @author LiQingSong
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}


