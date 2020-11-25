import Vue from "vue";
// import Cookies from "js-cookie";

/**
 * @description: 缓存
 * @param {String} name key
 * @param {String, Object} value value
 * @return: cache value
 * @use 存： ls.set("name", value);
 *      取： const value = ls.get("name");
 */
export const ls = {
  set(name, value, expire) {
    if (expire) {
      return Vue.ls.set(name, value, expire);
    } else {
      return Vue.ls.set(name, value);
    }
  },
  get(name) {
    return Vue.ls.get(name);
  },
  remove(name) {
    return Vue.ls.remove(name);
  }
};

// cookie  缓存
// export const cookie = {
//   set(name, value) {
//     return Cookies.set(name, value);
//   },
//   get(name) {
//     return Cookies.get(name);
//   },
//   remove(name) {
//     return Cookies.remove(name);
//   }
// };
