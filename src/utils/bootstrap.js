// import Vue from "vue";
import store from "@/store/";
import { THEME, THEMESTYLE, TOKEN, USERINFO } from "@/store/mutation-types";
import { ls } from "@/utils//cache";
import themeStyleUpdateData from "@/layouts/theme/";

export default function Initializer() {
  let theme = env.THEME;
  let themeStyle = env.THEMESTYLE;
  if (theme.isUserSet) {
    //允许用户自定义，获取缓存配置
    const cacheTheme = ls.get(THEME) || {};
    theme = { ...theme, ...cacheTheme };
    const cacheThemeStyle = ls.get(THEMESTYLE) || {};
    if (cacheThemeStyle) {
      themeStyle = { ...themeStyle, ...cacheThemeStyle };
    }
  }

  store.commit("SET_THEME", theme);
  store.commit("SET_THEMESTYLE", themeStyle);
  themeStyleUpdateData(themeStyle);

  const token = ls.get(TOKEN);
  store.commit("SET_TOKEN", token);

  const userInfo = ls.get(USERINFO);
  store.commit("SET_INFO", userInfo);
}
