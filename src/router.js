/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/home/index.vue'
import Main from '@/views/home/main.vue'

Vue.use(Router)


export const baseRouter = [
  {
    path: '*',
    component: resolve => require(['@/views/error/err404.vue'], resolve),
    hidden: true //代表隐藏 不在侧边栏显示
  },
  {
    path: "/401",
    component: resolve => require(['@/views/error/err401.vue'], resolve),
    name: "401",
    hidden: true
  },
  {
    path: "/404",
    component: resolve => require(['@/views/error/err404.vue'], resolve),
    name: "404",
    hidden: true
  },
  {
    path: "/500",
    component: resolve => require(['@/views/error/err500.vue'], resolve),
    name: "500",
    hidden: true
  },
  {
    path: '/login',
    name: '登录',
    component: resolve => require(['@/views/login/index.vue'], resolve),
    hidden: true
  },
  {
    path: '/',
    name: '主页',
    component: Home,
    redirect: '/readme',
    hidden: true
  },
  {
    path: "/readme",
    component: Home,
    redirect: "/readme/main",
    icon: "shouye",
    name: "控制台",
    noDropdown: true,
    children: [
      {
        path: "main",
        component: Main,
        hidden: false
      }
    ]
  }
]


export const userManage = [
  {
    path: "/user",
    component: Home,
    redirect: "/user/user-list",
    icon: "shouye",
    name: "用户管理",
    noDropdown: true,
    children: [
      {
        path: "user-list",
        component: function () {
          return import('@/views/user/UserList')
        }
      }
    ]
  }
]


export const productManage = [
  {
    path: "/product",
    component: Home,
    redirect: "/product/product-list",
    icon: "shouye",
    name: "商品管理",
    noDropdown: true,
    children: [
      {
        path: "product-list",
        component: function () {
          return import('@/views/product/ProductList')
        }
      }
    ]
  }
]


export const productClassManage = [
  {
    path: "/product-class",
    component: Home,
    redirect: "/product-class/product-class-list",
    icon: "shouye",
    name: "商品分类管理",
    noDropdown: true,
    children: [
      {
        path: "product-class-list",
        component: function () {
          return import('@/views/product-class/ProductClassList')
        }
      }
    ]
  }
]


export const supplierManage = [
  {
    path: "/supplier",
    component: Home,
    redirect: "/supplier/supplier-list",
    icon: "shouye",
    name: "供应商管理",
    noDropdown: true,
    children: [
      {
        path: "supplier-list",
        component: function () {
          return import('@/views/supplier/SupplierList')
        }
      }
    ]
  }
]


export const purchaseManage = [
  {
    path: "/purchase",
    component: Home,
    redirect: "/purchase/purchase-list",
    icon: "shouye",
    name: "进货管理",
    noDropdown: true,
    children: [
      {
        path: "purchase-list",
        component: function () {
          return import('@/views/purchase/PurchaseList')
        }
      }
    ]
  }
]


export const sellManage = [
  {
    path: "/sell",
    component: Home,
    redirect: "/sell/sell-list",
    icon: "shouye",
    name: "销售管理",
    noDropdown: true,
    children: [
      {
        path: "sell-list",
        component: function () {
          return import('@/views/sell/SellList')
        }
      }
    ]
  }
]



export default new Router({
  routes: baseRouter
})

// import 和 resolve => require()策略的选择
// 前者应该在一些经常使用的组件/路由 处使用  后者在偶尔调用的地方使用
// 有助于提升程序性能
