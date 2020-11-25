// eslint-disable-next-line
import BasicLayout from "@/layouts/default";

// import guide from "./modules/guide";

const keepPageBlock = () => import("@/layouts/page/keepPageBlock.js");

const Maps = [
  {
    path: "/home",
    name: "home",
    // redirect: "/admin/home",
    hidden: true,
    component: () => import("@/views/home/Index.vue"),
    meta: {
      title: "首页",
      icon: "home",
      affix: true //固定tab
    }
  },
  {
    path: "/auth",
    name: "auth",
    redirect: "/auth/index",
    meta: {
      title: "权限",
      icon: "home"
    },
    children: [
      {
        path: "/auth/index",
        name: "authIndex",
        component: () => import("@/views/test/test.vue"),
        meta: {
          title: "页面权限",
          keepAlive: false
        }
      },
      {
        path: "/auth/index2",
        name: "authIndex2",
        component: () => import("@/views/test/test2.vue"),
        meta: {
          title: "按钮权限",
          keepAliveName: "test2"
        }
      }
    ]
  },
  {
    path: "/test",
    name: "test",
    redirect: "/test/index",
    meta: {
      title: "测试",
      icon: "home"
    },
    children: [
      {
        path: "/test/index",
        name: "testIndex",
        redirect: "/test/cindex",
        meta: {
          title: "测试首页"
        },
        children: [
          {
            path: "/test/cindex",
            name: "testcIndex",
            component: keepPageBlock,
            meta: {
              title: "测试子页面",
              component: () => import("@/views/test/test3.vue")
            }
          },
          {
            path: "/test/cindex2",
            name: "testcIndex2",
            component: () => import("@/views/test/test.vue"),
            meta: {
              title: "测试子页面2"
            }
          }
        ]
      },
      {
        path: "/test/index2",
        name: "testIndex2",
        component: keepPageBlock,
        meta: {
          title: "测试2",
          component: () => import("@/views/test/test.vue")
        }
      },
      {
        path: "/test/index3",
        name: "testIndex3",
        component: keepPageBlock,
        meta: {
          title: "测试3",
          component: () => import("@/views/test/test.vue")
        }
      },
      {
        path: "/test/index4",
        name: "testIndex4",
        component: keepPageBlock,
        meta: {
          title: "测试4",
          component: () => import("@/views/test/test.vue")
        }
      },
      {
        path: "/test/index5",
        name: "testIndex5",
        component: keepPageBlock,
        meta: {
          title: "测试5",
          component: () => import("@/views/test/test.vue")
        }
      },
      {
        path: "/test/index6",
        name: "testIndex6",
        component: keepPageBlock,
        meta: {
          title: "测试6",
          component: () => import("@/views/test/test.vue")
        }
      },
      {
        path: "/test/index7",
        name: "testIndex7",
        component: keepPageBlock,
        meta: {
          title: "测试7",
          component: () => import("@/views/test/test.vue")
        }
      },
      {
        path: "/test/index8",
        name: "testIndex8",
        component: keepPageBlock,
        meta: {
          title: "测试8",
          component: () => import("@/views/test/test.vue")
        }
      },
      {
        path: "/test/index9",
        name: "testIndex9",
        component: keepPageBlock,
        meta: {
          title: "测试9",
          component: () => import("@/views/test/test.vue")
        }
      }
    ]
  },
  {
    path: "/test20",
    name: "test20",
    redirect: "/test/cindex20",
    meta: {
      title: "测试20",
      icon: "home"
    },
    children: [
      {
        path: "/test/cindex20",
        name: "testcIndex20",
        component: keepPageBlock,
        meta: {
          title: "测试子页面20",
          component: () => import("@/views/test/test3.vue")
        }
      },
      {
        path: "/test/cindex21",
        name: "testcIndex21",
        component: () => import("@/views/test/test.vue"),
        meta: {
          title: "测试子页面21"
        }
      },
      {
        path: "/test/cindex22",
        name: "testcIndex22",
        component: () => import("@/views/test/test.vue"),
        meta: {
          title: "测试子页面22"
        }
      },
      {
        path: "/test/cindex23",
        name: "testcIndex23",
        component: () => import("@/views/test/test.vue"),
        meta: {
          title: "测试子页面23"
        }
      }
    ]
  }
];
// const modulesMap = Maps.concat(guide, dataForm);
const modulesMap = Maps;

export const asyncRoutes = [
  {
    path: "/",
    name: "index",
    component: BasicLayout,
    meta: {
      title: "首页"
    },
    redirect: "/home",
    children: modulesMap
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRoutes = [
  {
    path: "/admin/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/sys/Login"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "fail" */ "@/views/exception/404.vue")
  }
];
