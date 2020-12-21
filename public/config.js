/* eslint-disable no-unused-vars */
const env = {
  APP_TITLE: "OPU-PRO",
  API_HOST: "http://www.tp6.com",
  DEBUG: true,
  STORAGEOPTIONS: {
    namespace: "opu_",
    name: "ls",
    storage: "local"
  },
  PERMISSION: {
    router: true, //是否开启路由权限验证
    action: true //是否开启功能权限验证
  },
  THEME: {
    isUserSet: true, //是否开放给用户设置，如果为true 则将配置缓存，否则只能修改配置文件来实现统一配置
    layoutMode: "sidemenu", //布局模式 sidemenu、topmenu、sidetopmenu
    layoutFixed: true,
    menuSplit: false, // 拆分导航
    multiTab: true,
    headerTheme: "dark", //light dark
    sideTheme: "dark",
    headerActionPosition: "header", // 操作栏位置,header/multiTabs
    headerShow: true,
    showLogo: true,
    sideDefaultWidth: 200,
    showBreadCrumb: true,
    showMenuSearch: true,
    sideDragWidth: true,
    contentMode: "full",
    routerTransition: "zoom-fade",
    themeStyle: "default",
    sideCollapsed: false,
    retainOpenKeys: true,
    greyMode: false
  },
  THEMESTYLE: {
    theme: "0",
    leftSidebar: "0",
    headerSidebar: "0",
    table: "0"
  }
};
