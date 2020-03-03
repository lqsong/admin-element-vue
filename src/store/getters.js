/** 
 * Vuex.Store getters
 * @author LiQingSong
 */
const getters = {
  siteFiexdHeader: state => state.app.siteFiexdHeader,
  siteTopNavEnable: state => state.app.siteTopNavEnable,
  siteSidebarLogo: state => state.app.siteSidebarLogo,
  sidebarOpened: state => state.app.sidebarOpened,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
};
export default getters;
