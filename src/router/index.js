import Vue from "vue";
import Router from "vue-router";
import { constantRoutes, asyncRoutes } from "./router.config";

Vue.use(Router);

// eslint-disable-next-line no-undef
let routers =  constantRoutes.concat(asyncRoutes);
const originalPush = Router.prototype.push
  Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: routers
});
