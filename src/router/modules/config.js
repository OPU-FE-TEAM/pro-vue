import RouteView from "@/layout/Utils/RouteView";
export default {
  path: "/config",
  name: "config",
  redirect: "/config/base",
  component: RouteView,
  meta: {
    title: "设置",
    icon: "setting"
  },
  children: [
    {
      path: "/config/base",
      name: "configBase",
      component: () =>
        import(/* webpackChunkName: "config" */ "@/views/config/Base.vue"),
      meta: {
        title: "基本设置"
      }
    }
  ]
};
