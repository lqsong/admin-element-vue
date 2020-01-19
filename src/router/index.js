import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入Index框架
import LayoutIndex from '@/layout/Index'

/**
 * 固定路由
 * 没有权限要求的路由
 * 所有角色可访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    hidden: true,
    redirect: '/home',
    component: LayoutIndex,
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home'),
        name: 'home',
        meta: {
          title: '首页'
        }
      }
    ]
  }

 
]

/**
 * 异步路由
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  
  // otherRouter,

  { path: '*', redirect: '/404', hidden: true }
];

/* 
// 打印对应链接的权限
const consoleLogRouteRoles = (routes, level) => {
   let obj = {};
   routes.map(item => {
      let { meta, children } = item;
      if (!meta) {
        return item;
      }
      let { title, roles } = meta;
      //console.log(meta);
      obj[title + level ] = roles[0] || '';
      // console.log(children);
      if (children) {
        obj = Object.assign(obj, consoleLogRouteRoles(children, level + 1));
      }
   })
   return obj;
}
console.log(JSON.stringify(consoleLogRouteRoles(asyncRoutes, 1)));
*/

const createRouter = () => new VueRouter({
  mode: 'history', // 启用的话就是去除#
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.BASE_URL,
  routes: constantRoutes
});

const router = createRouter();

// 细节见: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router;
