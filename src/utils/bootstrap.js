// import Vue from "vue";
import store from "@/store/";
import { THEME, TOKEN, USERINFO } from "@/store/mutation-types";
import { ls } from "@/utils//cache";

export default function Initializer() {
  let theme = env.THEME;
  if (theme.isUserSet) {
    //允许用户自定义，获取缓存配置
    const cacheCheme = ls.get(THEME);
    if (cacheCheme) {
      theme = {
        ...theme,
        ...cacheCheme
      };
    }
  }

  store.commit("SET_THEME", theme);

  const token = ls.get(TOKEN);
  store.commit("SET_TOKEN", token);

  const userInfo = ls.get(USERINFO);
  store.commit("SET_INFO", userInfo);
}
