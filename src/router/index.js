import Vue from "vue";
import Router from "vue-router";
import { constantRoutes, asyncRoutes } from "./router.config";

Vue.use(Router);

let routers = env.PERMISSION.router
  ? constantRoutes
  : constantRoutes.concat(asyncRoutes);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: routers
});

export default router;
