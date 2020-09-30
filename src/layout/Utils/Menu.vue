<script>
import { Menu, Icon } from "ant-design-vue";

import cloneDeep from "lodash/cloneDeep";
import { mixin } from "./mixin";
import { mapState, mapActions } from "vuex";
import { asyncRoutes } from "@/router/router.config";
import { treeFindPath } from "@/utils/common";
export default {
  name: "Menu",
  components: {
    Menu,
    MenuItem: Menu.Item,
    MenuSubMenu: Menu.SubMenu,
    Icon
  },
  props: {
    menus: {
      type: Array,
      required: true
    },
    menutheme: {
      type: String,
      required: false,
      default: "dark"
    },
    mode: {
      type: String,
      required: false,
      default: "inline"
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: true
    },
    activeName: {
      type: String,
      default: ""
    }
  },
  mixins: [mixin],
  data() {
    return {
      openKeys: [],
      copyMenus: [],
      selectedKeys: [],
      cachedOpenKeys: []
    };
  },
  computed: {
    ...mapState({
      mainMenu: state => state.app.menus,
      tabsPages: state => state.app.tabsPages,
      currentTab: state => state.app.currentTab
    })
  },
  watch: {
    collapsed(val) {
      if (val && this.theme.menuMode === "split") {
        this.cachedOpenKeys = this.openKeys.concat();
        this.openKeys = [this.activeName];
      } else {
        this.openKeys = this.cachedOpenKeys;
      }
    },
    currentTab(val) {
      this.selectedKeys = [val.fullPath];
    }
  },
  created() {
    this.init();
    this.updateMenu();
  },
  mounted() {
    const _this = this;
    this.$watch("theme.menuMode", () => {
      _this.init();
    });
  },
  methods: {
    ...mapActions(["setCurrentTab", "setTabsPages"]),

    init() {
      const menus = cloneDeep(this.menus);
      this.copyMenus = this.filterMenus(menus);
    },

    filterMenus(menus) {
      const newMenus = menus.filter(item => {
        if (item.meta && !item.hidden) {
          if (
            item.children &&
            item.children.length &&
            this.theme.menuMode === "basic"
          ) {
            item.children = this.filterMenus(item.children);
          } else if (this.theme.menuMode === "split") {
            // item.children = [];
            delete item.children;
            // item.children = [item.children[0]];
          }
          return true;
        } else {
          return false;
        }
      });
      return newMenus;
    },
    updateMenu() {
      const currentTab =
        (this.currentTab && this.currentTab.fullPath) || "/home";
      this.selectedKeys = [currentTab];

      const menus = asyncRoutes.find(item => item.path === "/").children;
      this.openKeys = treeFindPath(
        menus,
        data => data.name === this.currentTab.name
      );
    },
    onOpenChange(openKeys) {
      this.openKeys = openKeys;
    },
    renderItem(menu) {
      if (!menu.hidden) {
        // return this.renderMenuItem(menu);
        return menu.children && !menu.hideChildrenInMenu
          ? this.renderSubMenu(menu)
          : this.renderMenuItem(menu);
      }
      return null;
    },
    renderSubMenu(menu) {
      const itemArr = [];
      if (!menu.hideChildrenInMenu) {
        menu.children.forEach(item => itemArr.push(this.renderItem(item)));
      }
      return (
        <MenuSubMenu
          {...{ key: menu.name }}
          class="menu-sub-item"
          style="background:none"
        >
          <span slot="title" style={"color:" + this.theme.menuTextColor}>
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </span>
          {itemArr}
        </MenuSubMenu>
      );
    },
    renderMenuItem(menu) {
      const target = menu.meta.target || null;
      const props = {
        to: { name: menu.name },
        target: target
      };
      const active =
        menu.name === this.activeName && this.theme.menuMode === "split"
          ? "active"
          : "";

      let menuTextColor = "";
      // if (!active) {
      //   menuTextColor = "color:" + this.theme.menuTextColor;
      // }
      return (
        <MenuItem {...{ key: menu.path }} class={"menu-item " + active}>
          <a {...{ props }} style={menuTextColor}>
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </a>
        </MenuItem>
      );
    },
    renderIcon(icon) {
      if (icon === "none" || icon === undefined) {
        return null;
      }
      const props = {};
      typeof icon === "object" ? (props.component = icon) : (props.type = icon);
      return <Icon {...{ props }} />;
    },
    onMenuSelect(obj) {
      console.log(obj);
      if (obj.key === "/home") {
        // 切换到首页,直接操作tab设置为当前页
        this.setCurrentTab({
          fullPath: "/home",
          name: "home",
          title: "首页",
          params: {},
          query: {}
        });
      } else {
        this.$router.push({
          path: obj.key
        });
      }
    }
  },

  render() {
    const { copyMenus, mode, menutheme } = this;

    const props = {
      mode: mode,
      theme: menutheme,
      openKeys: this.openKeys
    };
    if (this.theme.layoutMode !== "topmenu") {
      props.inlineCollapsed = this.collapsed;
    }

    const on = {
      select: obj => {
        this.onMenuSelect(obj);
        // this.selectedKeys = obj.selectedKeys;
        this.$emit("select", obj);
      },
      openChange: this.onOpenChange
    };

    const menuTree = copyMenus.map(item => {
      if (item.hidden) {
        return null;
      }
      return this.renderItem(item);
    });

    let menuType = "";
    if (this.collapsed) {
      menuType = "smallMenuText";
    }

    return (
      <Menu
        class={"menu-box " + this.theme.layoutMode + " " + menuType}
        vModel={this.selectedKeys}
        {...{ props, on: on }}
        style="background:none;"
      >
        {menuTree}
      </Menu>
    );
  }
};
</script>

<style lang="less" scoped>
.menu-box {
  /deep/ .menu-sub-item {
    line-height: 65px;
  }
  &.topmenu {
    /deep/ .menu-item {
      line-height: 65px;
      position: relative;
      &.active::after {
        content: "";
        width: 0;
        height: 0;
        border-width: 0 10px 10px;
        border-style: solid;
        border-color: transparent transparent #fff;
        position: absolute;
        bottom: -2px;
        left: 50%;
        margin-left: -5px;
      }
    }
  }
}
</style>
