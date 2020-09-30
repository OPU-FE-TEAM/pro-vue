import Vue from "vue";
import Router from "vue-router";
import { constantRoutes, asyncRoutes } from "./router.config";

Vue.use(Router);

// eslint-disable-next-line no-undef
let routers = env.PERMISSION.router
  ? constantRoutes
  : constantRoutes.concat(asyncRoutes);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: routers
});
