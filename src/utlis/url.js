/** 
 * URL工具
 * @author LiQingSong
 */

 /**
 * 获取url中对应参数的值
 * @param  url        链接
 * @param  queryName  参数名
 * @returns String
 * @author LiQingSong
 */
export function getQueryValue(url, queryName) {
    if (url.indexOf("?") === -1) {
        return null;
    }
    let reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
    let r = url.split("?")[1].match(reg);
    if ( r != null ){
       return decodeURI(r[2]);
    }else{
       return null;
    }
}