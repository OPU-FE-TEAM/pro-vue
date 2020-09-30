const getters = {
  menus: state => state.app.menus,
  theme: state => state.app.theme,
  token: state => state.user.token,
  addRouters: state => state.app.addRouters,
  userInfo: state => state.user.info,
  tabsPages: state => state.app.tabsPages,
  isRegTabsPage: state => state.app.isRegTabsPage,
  currentTab: state => state.app.currentTab
};

export default getters;
