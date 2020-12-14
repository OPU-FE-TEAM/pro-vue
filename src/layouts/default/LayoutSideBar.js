import Logo from "./Logo";
import SearchMenuInput from "./SearchMenuInput";
import Menu from "./Menu";
import XDragLine from "@/components/tools/XDragLine";
import { treeTransArray } from "@/utils/common";

export default {
  props: {
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: Object,
      default: () => {}
    },
    device: String
  },
  data() {
    return {
      width: 200,
      sideMenus: [],
      searchValue: "",
      drawervShow: false
      // collapsed: false
    };
  },
  watch: {
    "theme.sideDefaultWidth"(val) {
      this.width = val;
    },
    menus(menus) {
      this.sideMenus = menus;
    },
    device(val) {
      if (val == "tablet") {
        this.toggleCollapsed(true);
      } else {
        this.toggleCollapsed(false);
      }
    }
  },
  created() {
    this.width = this.theme.sideDefaultWidth;
    this.sideMenus = this.menus;
  },
  mounted() {
    if (this.device == "tablet") {
      this.toggleCollapsed(true);
    } else if (this.device == "mobile") {
      this.toggleCollapsed(false);
    }
  },
  methods: {
    onDragLineChange(width) {
      this.width = width;
    },
    onMenuSearch(val) {
      this.searchValue = val;
    },
    toggleCollapsed(flag) {
      this.theme.sideCollapsed =
        flag === true || flag === false ? flag : !this.theme.sideCollapsed;
      if (this.theme.sideCollapsed) {
        this.$refs.menu && this.$refs.menu.setOpenKeys([]);
      }
    },
    toggleMenuOpen() {
      const openKeys = this.$refs.menu.getOpenKeys();
      if (
        openKeys.length === 0 ||
        (openKeys.length === 1 && openKeys[0] === "/home")
      ) {
        const menuList = treeTransArray(this.sideMenus);
        const keys = menuList.map(p => p.path);
        this.$refs.menu.setOpenKeys(keys);
      } else {
        this.$refs.menu.setOpenKeys([]);
      }
    },
    toggleDrawervOpen() {
      this.drawervShow = !this.drawervShow;
    },
    onDrawerClose() {
      this.drawervShow = false;
    },
    renderTrigger() {
      const { toggleCollapsed, theme, toggleMenuOpen } = this;
      let actions = "";
      if (!theme.sideCollapsed) {
        actions = (
          <a-tooltip>
            <template slot="title">展开/收起菜单</template>
            <div class="trigger-item" {...{ on: { click: toggleMenuOpen } }}>
              <a-icon type="bars" />
            </div>
          </a-tooltip>
        );
      }
      return (
        <div slot="trigger" class="layout-sidebar-trigger">
          <a-tooltip>
            <template slot="title">
              {theme.sideCollapsed ? "展开" : "收起"}
            </template>
            <div class="trigger-item" {...{ on: { click: toggleCollapsed } }}>
              <a-icon type={theme.sideCollapsed ? "right" : "left"} />
            </div>
          </a-tooltip>
          {actions}
        </div>
      );
    }
  },
  render() {
    const {
      sideMenus,
      theme,
      onDragLineChange,
      width,
      onMenuSearch,
      searchValue,
      renderTrigger,
      device,
      drawervShow,
      toggleDrawervOpen,
      onDrawerClose
    } = this;
    // 导航高度
    let menuWaperCutHeight = 0;
    if (
      (theme.layoutMode !== "sidetopmenu" && theme.showLogo) ||
      theme.layoutMode == "sidetopmenu"
    ) {
      menuWaperCutHeight += 48;
    }
    if (theme.layoutMode !== "sidetopmenu") {
      menuWaperCutHeight += 48;
    }
    if (theme.showMenuSearch && !theme.sideCollapsed) {
      menuWaperCutHeight += 58;
    }
    const sidebar = (
      <div>
        <a-layout-sider
          collapsible
          collapsed={theme.sideCollapsed}
          class={[`layout-sidebar` /*, theme.sideTheme*/]}
          width={width}
        >
          {theme.layoutMode !== "sidetopmenu" && theme.showLogo && (
            <Logo theme={theme} />
          )}
          {theme.showMenuSearch && !theme.sideCollapsed && (
            <SearchMenuInput {...{ on: { search: onMenuSearch } }} />
          )}
          <div
            class="layout-sidebar-menu-waper"
            style={{ height: `calc(100vh - ${menuWaperCutHeight}px)` }}
          >
            <Menu
              ref="menu"
              menus={sideMenus}
              // theme={theme.sideTheme}
              retainOpenKeys={theme.retainOpenKeys}
              searchValue={searchValue}
            />
          </div>
          {theme.sideDragWidth && !theme.sideCollapsed && (
            <XDragLine {...{ on: { widthChange: onDragLineChange } }} />
          )}
          {renderTrigger()}
        </a-layout-sider>
      </div>
    );
    if (device == "mobile") {
      // 移动端
      return (
        <div>
          <div id="sideDrawer" />
          <a-drawer
            placement="left"
            bodyStyle={{ padding: 0, overflow: "hidden" }}
            closable={false}
            visible={drawervShow}
            maskClosable={true}
            getContainer="#sideDrawer"
            width={width}
            {...{ on: { close: onDrawerClose } }}
          >
            {sidebar}
          </a-drawer>
          <div
            class={["side-drawer-button", theme.sideTheme]}
            {...{ on: { click: toggleDrawervOpen } }}
          >
            <a-icon type="menu" />
          </div>
        </div>
      );
    }
    return sidebar;
  }
};
