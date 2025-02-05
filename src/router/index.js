import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import HomeView from '../views/HomeView'
import Layout from '@/layout/index'

export const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { title: '首页', show: false },
  },
  {
    path: '/nations',
    name: 'nations',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/nation_static'),
    meta: { title: '国家', show: false },
  },
  {
    path: '/map',
    name: 'map',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/map'),
    meta: { title: '地图', show: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/system/dashboard'),
    meta: { title: '首页', icon: 'system', show: false },
  },
  {
    path: '/dataService',
    component: Layout,
    redirect: '/dataService/vector',
    meta: { title: '数据服务', show: true },
    children: [
      {
        path: 'sensingImage',
        name: 'SensingImage',
        component: () => import('../views/dataService/mapService/sensingImage'),
        meta: { title: '遥感影像服务', icon: 'system', show: true },
      },
      {
        path: 'vector',
        name: 'Vector',
        component: () => import('../views/dataService/mapService/vector'),
        meta: { title: '矢量服务', icon: 'system', show: true },
      },
      {
        path: 'styles',
        name: 'Styles',
        component: () => import('../views/dataService/mapService/styles'),
        meta: { title: '图层表管理', icon: 'system', show: true },
      },
      {
        path: 'servicePublish',
        name: 'ServicePublish',
        component: () => import('../views/dataService/mapService/servicePublish'),
        meta: { title: '发布服务', icon: 'system', show: false }
      },
      {
        path: 'LayerStyle',
        name: 'LayerStyle',
        component: () => import('../views/dataService/mapService/LayerStyle'),
        meta: { title: '修改样式', icon: 'system', show: false }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: { show: true, title: '系统管理' },
    children: [
      {
        path: 'tenants',
        name: 'Tenants',
        component: () => import('../views/system/tenants/index'),
        meta: { title: '租户管理', icon: 'tenant', show: true },
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('../views/system/roles/index'),
        meta: { title: '角色管理', icon: 'role', show: true },
      },
      {
        path: 'menus',
        name: 'Menus',
        component: () => import('../views/system/menus'),
        meta: { title: '菜单管理', icon: 'menu', show: true },
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('../views/system/users'),
        meta: { title: '用户管理', icon: 'user', show: true },
      },
    ],
  },
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login'),
    },
    ...routes,
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
