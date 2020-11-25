import { mapState } from "vuex";
import keepPage from "./keepPage";

export default {
  props: {
    theme: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState({
      keepAliveTabs: state => state.app.keepAliveTabs
    })
  },
  render() {
    const { theme, keepAliveTabs } = this;
    return (
      <div>
        <transition name={theme.routerTransition}>
          <keep-alive max={100} include={keepAliveTabs}>
            <router-view />
          </keep-alive>
        </transition>
        <keepPage />
      </div>
    );
  }
};
