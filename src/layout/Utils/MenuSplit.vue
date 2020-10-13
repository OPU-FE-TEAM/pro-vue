<script>
import { Menu, Icon } from "ant-design-vue";
import cloneDeep from "lodash/cloneDeep";
import { mixin } from "./mixin";
import { mapState } from "vuex";
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
      type: Object,
      required: true
    },
    menutheme: {
      type: String,
      required: false,
      default: "light"
    },
    mode: {
      type: String,
      required: false,
      default: "inline"
    },
    isopen: {
      type: Boolean,
      default: false
    },
    activeName: {
      type: String,
      default: ""
    }
  },
  model: {
    prop: "isopen",
    event: "update"
  },
  mixins: [mixin],
  data() {
    return {
      openKeys: [],
      copyMenus: [],
      selectedKeys: [],
      cachedOpenKeys: [],
      menuTitle: ""
      // isopen: true
    };
  },
  computed: {
    ...mapState({
      // 主路由
      currentTab: state => state.app.currentTab
    })
  },
  watch: {
    // isopen() {
    //   debugger;
    // },
    // collapsed(val) {
    //   if (val && this.theme.menuMode === "split") {
    //     this.cachedOpenKeys = this.openKeys.concat();
    //     this.openKeys = [this.activeName];
    //   } else {
    //     this.openKeys = this.cachedOpenKeys;
    //   }
    // },
    $route: function() {
      this.init();
      this.updateMenu();
    },
    currentTab() {
      this.init();
      this.updateMenu();
    }
  },
  created() {
    this.init();
    this.updateMenu();
  },
  methods: {
    init() {
      const menusData = cloneDeep(this.menus);
      const menus = menusData.children;
      this.copyMenus = this.filterMenus(menus);
      this.menuTitle =
        this.menus && this.menus.meta && this.menus.meta.title
          ? this.menus.meta.title
          : "-";
    },

    filterMenus(menus) {
      if (menus) {
        const newMenus = menus.filter(item => {
          if (item.meta && item.meta.isMenuShow !== false) {
            if (item.children && item.children.length) {
              item.children = this.filterMenus(item.children);
            }
            return true;
          } else {
            return false;
          }
        });
        this.$emit("update", true);
        return newMenus;
      } else {
        this.$emit("update", false);
        return [];
      }
    },
    updateMenu() {
      // const routes = this.$route.matched.concat();

      // if (routes.length >= 4 && this.$route.meta.hidden) {
      //   routes.pop();
      //   this.selectedKeys = [routes[2].path];
      // } else {
      //   this.selectedKeys = [routes.pop().path];
      // }
      let matched = {};
      if (this.menus.children && this.menus.children.length) {
        matched = this.menus.children.find(
          item => item.name == this.currentTab.name
        );
      }

      if (matched.path) {
        this.selectedKeys = [matched.path];
      } else {
        this.$emit("update", false);
      }
      // const openKeys = [];
      // if (this.mode === "inline" && this.theme.menuMode === "base") {
      //   this.menus.children.forEach(item => {
      //     openKeys.push(item.path);
      //   });
      // }
      // this.openKeys = openKeys;

      // this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
    },
    onOpenChange(openKeys) {
      // 在水平模式下时执行，并且不再执行后续
      // if (this.mode === "horizontal") {
      //   this.openKeys = openKeys;
      //   return;
      // }
      // 非水平模式时
      this.openKeys = openKeys;
      // const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key));
      // if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
      //   this.openKeys = openKeys;
      // } else {
      //   this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      // }
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
        <MenuSubMenu {...{ key: menu.path }} style="background:none">
          <span slot="title">
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
      return (
        <MenuItem {...{ key: menu.path }} class="menu-item">
          <router-link {...{ props }}>
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </router-link>
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
    }
  },

  render() {
    const _this = this;
    const { copyMenus, mode, menutheme } = this;
    const props = {
      mode: mode,
      theme: menutheme,
      openKeys: this.openKeys
    };
    if (this.theme.layoutMode !== "topmenu") {
      props.inlineCollapsed = false;
    }
    const on = {
      select: obj => {
        this.selectedKeys = obj.selectedKeys;
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

    const isopen = this.isopen ? "open" : "";
    let toggle = "";
    if (this.theme.layoutMode !== "topmenu" && copyMenus.length) {
      const toggleOn = {
        click() {
          // _this.isopen = !_this.isopen;
          _this.$emit("update", !_this.isopen);
        }
      };
      toggle = (
        <span class="toggle" {...{ on: toggleOn }}>
          <Icon type="menu-fold" />
          <span class="bg" />
        </span>
      );
    }

    let menuTitleContent = "";
    if (
      this.theme.layoutMode === "sidemenu" &&
      this.theme.menuMode === "split"
    ) {
      menuTitleContent = <div class="menu-title">{this.menuTitle}</div>;
    }

    return (
      <div class={"menu-box " + isopen + " " + this.theme.layoutMode}>
        {menuTitleContent}
        <Menu
          class="layout-menu"
          vModel={this.selectedKeys}
          {...{ props, on: on }}
          style="background:none"
        >
          {menuTree}
        </Menu>
        {toggle}
      </div>
    );
  }
};
</script>

<style lang="less" scoped>
.menu-box {
  height: 100%;
  position: absolute;
  z-index: 100;
  left: -100px;
  width: 140px;
  background: #fff;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
  .menu-title {
    padding: 10.5px;
    text-align: center;
    border-bottom: 1px solid #e8e8e8;
  }
  /deep/ .menu-item::after {
    content: "";
    display: none;
  }
  .toggle {
    position: absolute;
    top: 50%;
    right: -25px;
    text-align: center;
    width: 24px;
    z-index: 1;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    i {
      font-size: 18px;
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -o-transition: all 0.1s ease, 0.1s ease;
      -ms-transition: all 0.1s ease, 0.1s ease;
      -moz-transition: all 0.1s ease, 0.1s ease;
      -webkit-transition: all 0.1s ease, 0.1s ease;
      position: relative;
      left: -5px;
    }
    .bg {
      position: absolute;
      left: 0;
      z-index: -1;
      top: -15px;
      height: 50px;
      -o-transition: all 0.1s ease, 0.1s ease;
      -ms-transition: all 0.1s ease, 0.1s ease;
      -moz-transition: all 0.1s ease, 0.1s ease;
      -webkit-transition: all 0.1s ease, 0.1s ease;
      border-bottom: 9px solid transparent;
      border-right: none;
      border-left: 18px solid #d9dee4;
      border-top: 9px solid transparent;
    }

    &:hover {
      right: -25px;
      i {
        left: 0;
      }
      .bg {
        border-left: 25px solid #d9dee4;
      }
    }
  }
  &.open {
    left: 0px;
    overflow: hidden;
    .toggle {
      right: -8px;
      i {
        left: 0;
      }
      &:hover {
        right: 0px;
      }
      i {
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
      }
      .bg {
        border-left: none;
        border-right: 25px solid #f7f7f7;
      }
    }
  }
  &.topmenu {
    left: 0;
    padding: 0 50px;
    height: 47px;
    background: #fff;
    width: 100%;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
    /deep/ .ant-menu-horizontal {
      border-bottom: none;
    }
  }
}
</style>
