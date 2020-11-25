import router from "@/router/";
import { ls } from "@/utils//cache";
import { TOKEN, USERINFO } from "@/store/mutation-types";

const user = {
  state: {
    info: {},
    token: ""
  },

  mutations: {
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },

  actions: {
    setUserInfo({ commit }, info) {
      ls.set(USERINFO, info);
      commit("SET_INFO", info);
    },
    setToken({ commit }, token) {
      ls.set(TOKEN, token);
      commit("SET_TOKEN", token);
    },
    logout({ commit }) {
      commit("SET_TOKEN", "");
      commit("SET_INFO", {});
      ls.remove(TOKEN);
      ls.set(USERINFO, {});
      router.push({
        name: "login"
      });
    }
  }
};

export default user;
