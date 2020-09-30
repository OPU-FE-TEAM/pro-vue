// import { jump } from "@/utils/common";
import router from "@/router/";
import { ls, cookie } from "@/utils//cache";
import { TOKEN, USERINFO, CURRENTWAREHOUSE } from "@/store/mutation-types";

const user = {
  state: {
    info: {},
    token: "",
    currentWarehouse: {}
  },

  mutations: {
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_CURRENTWAREHOUSE: (state, data) => {
      state.currentWarehouse = data;
    }
  },

  actions: {
    setUserInfo({ commit }, info) {
      // const user = cache.get("user");
      ls.set(USERINFO, info);
      commit("SET_INFO", info);
    },
    setToken({ commit }, token) {
      cookie.set(TOKEN, token, { expires: 1 });
      commit("SET_TOKEN", token);
    },
    logout({ commit }) {
      commit("SET_TOKEN", "");
      commit("SET_INFO", {});
      cookie.remove(TOKEN);
      ls.set(USERINFO, {});
      router.push({
        name: "login"
      });
    },
    setCurrentWarehouse({ commit }, data) {
      ls.set(CURRENTWAREHOUSE, data);
      commit("SET_CURRENTWAREHOUSE", data);
    }
  }
};

export default user;
