import store from "@/store";

export default {
  // eslint-disable-next-line no-unused-vars
  inserted(el, binding, vnode) {
    if (!(env.PERMISSION && env.PERMISSION.action)) {
      return false;
    }
    const { value } = binding;
    const userInfo = store.getters && store.getters.userInfo;
    const permissions = userInfo && userInfo.permission;

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;

      const hasPermission = permissions.some(role => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`);
    }
  }
};
