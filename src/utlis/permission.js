/** 
 * 权限、显示工具
 * @author LiQingSong
 */

/**
 * 获取当前路由对应的顶部菜单path
 * @param  route 当前路由
 * @returns String
 * @author LiQingSong
 */
export function getBelongTopMenuPath(route) {
    // const route = this.$route;
    const { meta, path } = route;
    if (meta.belongTopMenu) {
      return meta.belongTopMenu;
    }
    return '/' + path.split('/')[1];
}

/**
 * 获取当前路由选中的侧边栏菜单path
 * @param  route 当前路由
 * @returns String
 * @author LiQingSong
 */
export function getActiveSidebarMenuPath(route) {
  // const route = this.$route;
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
}