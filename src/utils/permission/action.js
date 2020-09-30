import Vue from "vue";
import store from "@/store";

!Vue.prototype.$auth &&
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get() {
        return permissions => {
          // eslint-disable-next-line no-undef
          if (!env.PERMISSION.action) {
            return true;
          }
          const userInfo = store.getters && store.getters.userInfo;
          const userPermissions = userInfo && userInfo.permission;
          if (userPermissions && userPermissions.length) {
            return userPermissions.includes(permissions);
          }
        };
      }
    }
  });
