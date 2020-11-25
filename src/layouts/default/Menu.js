import cloneDeep from "lodash/cloneDeep";
import { utils } from "opu-components-vue";
import { mapState } from "vuex";

let autoOpenKeys = [];
export default {
  name: "Menu",
  props: {
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      default: "dark"
    },
    mode: {
      type: String,
      default: "inline"
    },
    retainOpenKeys: {
      type: Boolean,
      required: false,
      default: true
    },
    searchValue: {
      type: String,
      default: ""
    }
    // activeName: {
    //   type: String,
    //   default: ""
    // }
  },
  computed: {
    ...mapState({
      allMenus: state => state.app.menus
    })
  },
  data() {
    return {
      openKeys: [],
      copyMenus: [],
      selectedKeys: [],
      cachedOpenKeys: []
    };
  },
  watch: {
    $route: function() {
      this.updateMenu();
    },
    menus() {
      this.init();
    }
  },
  created() {
    this.init();
    this.updateMenu();
  },
  mounted() {},
  methods: {
    init() {
      const menus = cloneDeep(this.menus);
      this.copyMenus = this.filterMenus(menus);
    },

    filterMenus(menus) {
      const newMenus = menus.filter(item => {
        if (item.meta && !item.hidden) {
          if (
            item.children &&
            item.children.length
            // this.theme.menuMode === "basic"
          ) {
            item.children = this.filterMenus(item.children);
          }
          return true;
        } else {
          return false;
        }
      });
      return newMenus;
    },
    updateMenu() {
      const { retainOpenKeys } = this;
      const menuTree = utils.findTree(
        this.menus,
        item => item.name === this.$route.name
      );
      if (!menuTree) {
        // 顶部栏拆分导航，页面路由不存在当前导航中
        const currentMenuTree = utils.findTree(
          this.allMenus,
          item => item.name === this.$route.name
        );
        if (
          currentMenuTree &&
          currentMenuTree.nodes &&
          currentMenuTree.nodes.length
        ) {
          this.selectedKeys = [currentMenuTree.nodes[0].path];
        }
      } else {
        this.selectedKeys = [menuTree.item.path];
        if (this.mode === "inline") {
          let openKeys = [];
          if (retainOpenKeys) {
            openKeys = this.openKeys;
          }
          menuTree.nodes.forEach(item => {
            if (!openKeys.includes(item.path)) {
              openKeys.push(item.path);
            }
          });
          this.openKeys = openKeys;
        }
      }
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
    renderMenuItemTitle(menu) {
      const { title } = menu.meta;
      let name = "";
      const index = title.indexOf(this.searchValue);
      if (this.searchValue && index > -1) {
        const beforeStr = title.substr(0, index);
        const afterStr = title.substr(index + this.searchValue.length);
        name = (
          <span>
            {beforeStr}
            <span class={`menu_keyword`}>{this.searchValue}</span>
            {afterStr}
          </span>
        );
        autoOpenKeys.push(menu.path);
      } else {
        name = <span>{title}</span>;
      }
      return name;
    },
    renderSubMenu(menu) {
      const itemArr = [];
      if (!menu.hideChildrenInMenu) {
        menu.children.forEach(item => itemArr.push(this.renderItem(item)));
      }
      const { icon } = menu.meta;
      const name = this.renderMenuItemTitle(menu);
      return (
        <a-sub-menu
          {...{ key: menu.path }}
          class="menu-sub-item"
          style="background:none"
        >
          <span slot="title">
            {this.renderIcon(icon)}
            <span>{name}</span>
          </span>
          {itemArr}
        </a-sub-menu>
      );
    },
    renderMenuItem(menu) {
      const target = menu.meta.target || null;
      const props = {
        to: { name: menu.name },
        target: target
      };

      const { icon } = menu.meta;
      const name = this.renderMenuItemTitle(menu);
      return (
        <a-menu-item {...{ key: menu.path }} class={"menu-item "}>
          <router-link {...{ props }}>
            {this.renderIcon(icon)}
            {name}
          </router-link>
        </a-menu-item>
      );
    },
    renderIcon(icon) {
      if (icon === "none" || icon === undefined) {
        return null;
      }
      const props = {};
      typeof icon === "object" ? (props.component = icon) : (props.type = icon);
      return <a-icon {...{ props }} />;
    },
    renderMenu(copyMenus) {
      const menuTree = copyMenus.map(item => {
        if (item.hidden) {
          return null;
        }
        return this.renderItem(item);
      });
      return menuTree;
    },
    getOpenKeys() {
      return this.openKeys;
    },
    setOpenKeys(keys) {
      this.openKeys = keys;
    }
  },

  render() {
    const { copyMenus, mode, theme, renderMenu } = this;
    autoOpenKeys = [];
    const on = {
      select: obj => {
        this.selectedKeys = obj.selectedKeys;
        this.$emit("select", obj);
      },
      openChange: this.setOpenKeys
    };
    const menuTree = renderMenu(copyMenus);
    const props = {
      mode: mode,
      theme: theme,
      openKeys: [...autoOpenKeys, ...this.openKeys]
    };
    return (
      <a-menu
        class={"layout-menu"}
        vModel={this.selectedKeys}
        {...{ props, on: on }}
        style="background:none;"
      >
        {menuTree}
      </a-menu>
    );
  }
};
