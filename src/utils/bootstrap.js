import store from "@/store/";
import {
  THEME,
  TOKEN,
  USERINFO,
  CURRENTWAREHOUSE
} from "@/store/mutation-types";
import { ls, cookie } from "@/utils//cache";

export default function Initializer() {
  // eslint-disable-next-line no-undef
  let theme = env.THEME;
  if (theme.isUserSet) {
    //允许用户自定义，获取缓存配置
    const cacheCheme = ls.get(THEME);
    if (cacheCheme) {
      theme = { ...theme, ...cacheCheme };
    }
  }

  store.commit("SET_THEME", theme);

  const token = cookie.get(TOKEN);
  store.commit("SET_TOKEN", token);

  const userInfo = ls.get(USERINFO);
  store.commit("SET_INFO", userInfo);

  const currentWarehouse = ls.get(CURRENTWAREHOUSE);
  store.commit("SET_CURRENTWAREHOUSE", currentWarehouse);
}
