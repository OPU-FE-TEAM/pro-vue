// eslint-disable-next-line no-unused-vars
var env = {
  APP_TITLE: "管理中心",
  API_HOST: "/api",
  DEBUG: true,
  PERMISSION: {
    router: false, //是否开启路由权限验证
    action: true //是否开启功能权限验证
  },
  STORAGEOPTIONS: {
    namespace: "opu_",
    name: "ls",
    storage: "local"
  },
  THEME: {
    isUserSet: true, //是否开放给用户设置，如果为true 则将配置缓存，否则只能修改配置文件来实现统一配置
    layoutMode: "sidemenu", //布局模式 sidemenu、topmenu、sidetopmenu
    menuMode: "base", //导航模式 ， base基础， split拆分
    mainColor: "#1890ff",
    menuBackground: "#001529", //导航背景色
    menuActiveBackground: "rgba(255, 255, 255, 0.1)", //导航高亮背景色
    menuTextColor: "#ccc", //导航文本色
    headerBackground: "#525252", //头部背景色
    headerTextColor: "#ffffff", //头部文本色
    layoutFixed: true,
    colorWeak: false,
    multiTab: true
  }
};
