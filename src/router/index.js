import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/enterprise',
    component: Layout,
    redirect: '/example/table',
    name: '企业管理',
    meta: { title: '企业管理', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '企业列表',
        component: () => import('@/views/enterprise/index'),
        meta: { title: '企业列表', icon: 'table',roles:['admin'] }
      },
      {
        path: 'newEnterPrise',
        name: 'newEnterPrise',
        component: () => import('@/views/enterprise/new'),
        meta: { title: '新增企业', icon: 'tree',roles:['admin'] }
      },
      {
        path: 'enterpriseEdit',
        name: 'EnterpriseEdit',
        component: () => import('@/views/enterprise/edit'),
        meta: { title: '企业编辑', icon: 'tree', roles: ['admin'] },
        hidden:true
      },
      {
        path: 'enterpriseList',
        name: 'EnterpriseList',
        component: () => import('@/views/enterprise/preview'),
        meta: { title: '企业列表', icon: 'tree', roles: ['editor','broker'] },
        hidden:false
      }
    ]
  },
  {
    path: '/employee',
    component: Layout,
    redirect: '/employee/employeeList',
    name: 'employee',
    meta: {
      title: '员工管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'employeeList',
        name: 'employeeList',
        component: () => import('@/views/employee/index'),
        meta: { title: '员工列表', icon: 'table',roles:['admin','editor','broker'] }
      },
      {
        path: 'employeeSignLogList',
        name: 'employeeSignLogList',
        component: () => import('@/views/employee/employeeSignList'),
        meta: { title: '签到日志', icon: 'tree',roles:['admin','editor','broker'] }
      }
    ]
  },
  {
    path: '/editor',
    component: Layout,
    redirect: '/editor/index',
    name: 'employee',
    meta: {
      title: '代理管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'employeeList',
        name: 'employeeList',
        component: () => import('@/views/employee/index'),
        meta: { title: '代理列表', icon: 'table',roles:['admin','editor','broker'] }
      },
      {
        path: 'employeeSignLogList',
        name: 'employeeSignLogList',
        component: () => import('@/views/employee/employeeSignList'),
        meta: { title: '新增代理', icon: 'tree',roles:['admin','editor','broker'] }
      },
      {
        path: 'employeeSignLogList',
        name: 'employeeSignLogList',
        component: () => import('@/views/employee/employeeSignList'),
        meta: { title: '经纪人列表', icon: 'tree',roles:['admin','editor','broker'] }
      },
      {
        path: 'employeeSignLogList',
        name: 'employeeSignLogList',
        component: () => import('@/views/employee/employeeSignList'),
        meta: { title: '新增经纪人', icon: 'tree',roles:['admin','editor','broker'] }
      }
    ]
  },
  {
    path: '/cash',
    component: Layout,
    redirect: '/editor/index',
    name: 'employee',
    meta: {
      title: '财务数据',
      icon: 'money'
    },
    children: [
      {
        path: 'employeeList',
        name: 'employeeList',
        component: () => import('@/views/employee/index'),
        meta: { title: '代理收益表', icon: 'table',roles:['admin','editor','broker'] }
      },
      {
        path: 'employeeSignLogList',
        name: 'employeeSignLogList',
        component: () => import('@/views/employee/employeeSignList'),
        meta: { title: '员工提现表', icon: 'tree',roles:['admin','editor','broker'] }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true },

 
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
