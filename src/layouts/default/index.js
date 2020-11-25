import { mapState } from "vuex";
import LayoutSideBar from "./LayoutSideBar";
import LayoutContent from "./LayoutContent";
import LayoutHeader from "./LayoutHeader";
import MultipleTabs from "./multitabs";
import { utils } from "opu-components-vue";
import cloneDeep from "lodash/cloneDeep";
import "./index.less";
import "../theme/index.less";

export default {
  computed: {
    ...mapState({
      // 主路由
      menus: state => state.app.menus,
      theme: state => state.app.theme,
      device: state => state.app.device
    }),
    sideMenus() {
      if (this.theme.menuSplit) {
        // 拆分模式
        const menuTree = utils.findTree(
          this.menus,
          item => item.name === this.$route.name
        );
        if (menuTree.nodes && menuTree.nodes.length) {
          if (menuTree.nodes[0].children && menuTree.nodes[0].children.length) {
            return menuTree.nodes[0].children;
          } else {
            return [];
          }
        }
        return menuTree.items;
      }

      return this.menus;
    },
    headerMenus() {
      if (this.theme.menuSplit) {
        // 拆分模式
        const menus = cloneDeep(this.menus);
        const headerMenus = menus.map(item => {
          delete item.children;
          return item;
        });
        return headerMenus;
      }
      return this.menus;
    }
  },
  render() {
    const { theme, sideMenus, headerMenus, device } = this;
    return (
      <a-layout
        class={[
          `default-layout`,
          theme.layoutMode,
          `theme-${theme.themeStyle}`,
          { "grey-mode": theme.greyMode }
        ]}
      >
        {theme.layoutMode === "sidetopmenu" && theme.headerShow && (
          <LayoutHeader
            class="sidetop-header"
            menus={headerMenus}
            theme={theme}
            device={device}
          />
        )}
        <a-layout>
          {(theme.layoutMode !== "topmenu" || device == "mobile") && (
            <LayoutSideBar menus={sideMenus} theme={theme} device={device} />
          )}
          <a-layout class="default-layout__content">
            {theme.headerShow && theme.layoutMode !== "sidetopmenu" && (
              <LayoutHeader menus={headerMenus} theme={theme} device={device} />
            )}
            {theme.multiTab && <MultipleTabs theme={theme} />}
            <div class={[`default-layout__main`, { fixed: theme.layoutFixed }]}>
              <LayoutContent theme={theme} />
            </div>
          </a-layout>
        </a-layout>
      </a-layout>
    );
  }
};
