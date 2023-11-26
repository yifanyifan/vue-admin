/**
 * 1. 先导入vue-router
 * createRouter 创建路由的方法
 * createWebHistory 路由模式（History）      
 * History 前面用的是 / 开头，一般是要后端配合使用，容易产生404
 * createWebHashHistory 路由模式（Hash）  
 * Hash 前面用的是 # 开头，无需配合
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
// 导入 home 组件
import HomeView from '../views/HomeView.vue'

// 导入管理员和用户的组件
import ManagerIndexView from '@/views/manager/ManagerIndexView.vue'
import ManagerListView from '@/views/manager/ManagerListView.vue'
import RoleListView from '@/views/manager/RoleListView.vue'
import PermissionListView from '@/views/manager/PermissionListView.vue'
import UserListView from '@/views/manager/UserListView.vue'
//导入轮播图管理相关组件
import BannerIndexView from '../views/banner/BannerIndexView.vue'
import BannerListView from '../views/banner/BannerListView.vue'
import AddBannerView from '../views/banner/AddBannerView.vue'
//导入产品管理
import ProIndexView from '../views/pro/ProIndexView.vue'
import ProListView from '../views/pro/ProListView.vue'
import AddProView from '../views/pro/AddProView.vue'
//导入图表管理
import EChartsIndexView from '../views/echarts/EChartsIndexView.vue'
import EChartsShowView from '../views/echarts/EChartsShowView.vue'
import EChartsView from '../views/echarts/EChartsView.vue'
//excel 管理
import ExcelIndexView from '../views/excel/ExcelIndexView.vue'
import ExcelExportView from '../views/excel/ExcelExportView.vue'
import ExcelImportView from '../views/excel/ExcelImportView.vue'
//富文本 管理
import Brc20IndexView from '../views/brc20/Brc20IndexView.vue'
import InscriptionsShowView from '../views/brc20/InscriptionsShowView.vue'
import Brc20ShowView from '../views/brc20/Brc20ShowView.vue'

//地图 管理
import MapIndexView from '../views/map/MapIndexView.vue'
import MapShowView from '../views/map/MapShowView.vue'


//路由规则配置
export const routes = [{
  // 访问时的路径
  path: '/',
  // 命名路由，路由别名
  name: 'home',
  label: '首页',
  // 当访问到对应路由后需要展示的组件
  component: HomeView,
  // 路由嵌套，配置二级路由
  children: [
    {
      path: 'manager',
      name: 'manager',
      label: '系统管理',
      component: ManagerIndexView,
      //配置三级路由
      children: [
        {
          path: 'managerlist',
          name: 'managerlist',
          label: '用户列表',
          component: ManagerListView
        },
        {
          path: 'rolelist',
          name: 'rolelist',
          label: '角色列表',
          component: RoleListView
        },
        {
          path: 'permissionlist',
          name: 'permissionlist',
          label: '菜单列表',
          component: PermissionListView
        }
      ]
    },
    {
      path: 'banner',
      name: 'banner',
      label: '合约概览',
      component: BannerIndexView,
      children:[
        {
          path: 'bannerlist',
          name: 'bannerlist',
          label: '合约概览图',
          component: BannerListView
        },
      ]
    },
    {
      path: 'brc20',
      name: 'brc20',
      label: 'brc20',
      component: Brc20IndexView,
      children:[
        {
          path: 'inscriptionslist',
          name: 'inscriptionslist',
          label: 'Brc20列表',
          component: InscriptionsShowView
        },
        {
          path: 'brc20list',
          name: 'brc20list',
          label: 'Brc20列表',
          component: Brc20ShowView
        },
      ]
    },
    // {
    //   path: 'pro',
    //   name: 'pro',
    //   label: '产品管理',
    //   component: ProIndexView,
    //   children:[
    //     {
    //       path: 'prolist',
    //       name: 'prolist',
    //       label: '产品列表',
    //       component: ProListView
    //     },
    //     {
    //       path: 'addpro',
    //       name: 'addpro',
    //       label: '添加产品',
    //       component: AddProView
    //     }
    //   ]
    // },
    // {
    //   path: 'echarts',
    //   name: 'echarts',
    //   label: '图表管理',
    //   component: EChartsIndexView,
    //   children:[
    //     {
    //       path: 'echartsshow',
    //       name: 'echartsshow',
    //       label: '显示图表',
    //       component: EChartsShowView
    //     },
    //     {
    //       path: 'echartsview',
    //       name: 'echartsview',
    //       label: '仪表现实',
    //       component: EChartsView
    //     }
    //   ]
    // },
    // {
    //   path: 'excel',
    //   name: 'excel',
    //   label: 'excel管理',
    //   component: ExcelIndexView,
    //   children:[
    //     {
    //       path: 'excelimport',
    //       name: 'excelimport',
    //       label: 'excel导入',
    //       component: ExcelImportView
    //     },
    //     {
    //       path: 'excelexport',
    //       name: 'excelexport',
    //       label: 'excel导出',
    //       component: ExcelExportView
    //     }
    //   ]
    // },
    // {
    //   path: 'editor',
    //   name: 'editor',
    //   label: '富文本编辑器',
    //   component: EditorIndexView,
    //   children:[
    //     {
    //       path: 'editorshow',
    //       name: 'editorshow',
    //       label: '编辑器',
    //       component: EditorShowView
    //     }
    //   ]
    // },
    // {
    //   path: 'map',
    //   name: 'map',
    //   label: '地图管理',
    //   component: MapIndexView,
    //   children:[
    //     {
    //       path: 'mapshow',
    //       name: 'mapshow',
    //       label: '百度地图',
    //       component: MapShowView
    //     }
    //   ]
    // }
  ]
},
{
  path: '/login',
  name: 'login',
  // 路由懒加载!!!!!，对于一些不确定立即需要显示的页面，可以使用懒加载
  component: () => import('../views/LoginView.vue')
},
{
  path: '/vuextest',
  name: 'vuextest',
  // 路由懒加载!!!!!，对于一些不确定立即需要显示的页面，可以使用懒加载
  component: () => import('../views/vuextest/VuexTest.vue')
}

]

//创建 router 实例
const router = createRouter({
  // 配置路由模式
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 配置路由规则
  routes
})

// 导出路由
export default router
