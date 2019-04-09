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
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页'}
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
      // {
      //   path: 'employeeSignLogList',
      //   name: 'employeeSignLogList',
      //   component: () => import('@/views/employee/employeeSignList'),
      //   meta: { title: '签到日志', icon: 'tree',roles:['admin','editor','broker'] }
      // },
      {
        path: 'employeeJoinList',
        name: 'employeeJoinList',
        component: () => import('@/views/employee/employeeJoinList'),
        meta: { title: '报名列表', icon: 'tree',roles:['admin','editor','broker'] }
      },
      {
        path: 'employeeJoinedList',
        name: 'employeeJoinedList',
        component: () => import('@/views/employee/employeeJoinedList'),
        meta: { title: '入职列表', icon: 'tree',roles:['admin','editor','broker'] }
      }
    ]
  },
  {
    path: '/mauth',
    component: Layout,
    redirect: '/auth/employeeIdCardList',
    name: 'employee',
    meta: {
      title: '认证管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'employeeIdCardList',
        name: 'employeeIdCardList',
        component: () => import('@/views/mauth/employeeIdCardList'),
        meta: { title: '身份证认证', icon: 'table',roles:['admin'] }
      },
      {
        path: 'employeeBankCardList',
        name: 'employeeBankCardList',
        component: () => import('@/views/mauth/employeeBankCardList'),
        meta: { title: '银行卡认证', icon: 'tree',roles:['admin'] }
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
        path: 'shopList',
        name: 'editorList',
        component: () => import('@/views/editors/shopList'),
        meta: { title: '门店列表', icon: 'table',roles:['admin','editor'] }
      },
      {
        path: 'newShop',
        name: 'newShop',
        component: () => import('@/views/editors/newShop'),
        meta: { title: '新增门店', icon: 'tree',roles:['admin'] }
      },
      {
        path: 'editorList',
        name: 'editorList',
        component: () => import('@/views/editors/index'),
        meta: { title: '代理列表', icon: 'table',roles:['admin','editor'] }
      },
      {
        path: 'newEditor',
        name: 'newEditor',
        component: () => import('@/views/editors/new'),
        meta: { title: '新增代理', icon: 'tree',roles:['admin'] }
      },
      {
        path: 'brokerList',
        name: 'brokerList',
        component: () => import('@/views/broker/index'),
        meta: { title: '经纪人列表', icon: 'tree',roles:['admin','editor'] }
      },
      {
        path: 'addBroker',
        name: 'addBroker',
        component: () => import('@/views/broker/new'),
        meta: { title: '新增经纪人', icon: 'tree',roles:['admin','editor'] }
      }
    ]
  },
  {
    path: '/cash',
    component: Layout,
    redirect: '/cashdata/index',
    name: 'cash',
    meta: {
      title: '财务数据',
      icon: 'nested'
    },
    children: [
      {
        path: 'employeeList',
        name: 'employeeList',
        component: () => import('@/views/employee/index'),
        meta: { title: '代理收益表', icon: 'table',roles:['admin'] }
      },
      {
        path: 'employeeList',
        name: 'employeeList',
        component: () => import('@/views/employee/index'),
        meta: { title: '经纪人收益表', icon: 'table',roles:['admin','editor'] }
      },
      {
        path: 'employeeSignLogList',
        name: 'employeeSignLogList',
        component: () => import('@/views/employee/employeeSignList'),
        meta: { title: '员工提现表', icon: 'tree',roles:['admin'] }
      }
    ]
  },
  {
    path: '工具',
    component: Layout,
        meta: {
      title: '工具',
      icon: 'nested'
    },
    children: [
      {
        path: 'http://api.map.baidu.com/lbsapi/getpoint/index.html',
        meta: { title: '经纬度拾取', icon: 'link' }
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true },

 
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
