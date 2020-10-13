<script>
import { mapState } from "vuex";
import { LayoutSideMenu, LayoutTopMenu } from "./Layouts";
import { mixin } from "./Utils/mixin";
import { updateTheme } from "./Setting/settingConfig"; 
import { asyncRoutes } from "@/router/router.config";

export default {
  name: "BasicLayout",
  components: {
    LayoutSideMenu,
    LayoutTopMenu
  },

  data() {
    return {
      collapsed: false,
      menus: [],
      activeName: "",
      // menusSplitOpen: true,
      env
    };
  },
  mixins: [mixin],

  computed: {
    ...mapState({
      // 主路由
      mainMenu: state => state.app.addRouters, 
      currentTab: state => state.app.currentTab
    }),
    menuSplitData() {
      if (this.activeName) {
        const index = this.menus.findIndex(
          item => item.name === this.activeName
        );
        return this.menus[index];
      }
      return {};
    },
    menusSplitData() {
      if (this.activeName) {
        const index = this.menus.findIndex(
          item => item.name === this.activeName
        );
        return this.menus[index];
      }
      return {};
    }
  },
  watch: {
    $route() {
      this.upDateActiveName();
    },
    currentTab() { 
      this.upDateActiveName();
    }
  },
  created() {  
    if (env.PERMISSION && env.PERMISSION.router) {
      this.menus = this.mainMenu.find(item => item.path === "/").children;
    } else {
      this.menus = asyncRoutes.find(item => item.path === "/").children;
    }
    this.upDateActiveName();
    updateTheme(this.theme);
  },
  mounted() {},
  methods: {
    upDateActiveName() {
      const matched = this.menus.find(el => {
        if (el.name == this.currentTab.name) {
          return el;
        } else {
          if (el.children && el.children.length) {
            const result = el.children.find(
              item => item.name == this.currentTab.name
            );
            return result;
          }
        }
      });
      if (matched) {
        this.activeName = matched.name;
      }
    }
  },
  render(h) {
    const layouts = {
      sidemenu: "layout-side-menu",
      topmenu: "layout-top-menu"
    };
    const layoutMode = layouts[this.theme.layoutMode]
      ? layouts[this.theme.layoutMode]
      : "layout-side-menu";

    const option = {
      props: {
        menus: this.menus,
        activeName: this.activeName,
        menuSplitData: this.menuSplitData,
        // menusSplitOpen: this.menusSplitOpen,
        menusSplitData: this.menusSplitData
      }
    };
    const template = h(layoutMode, option);
    return template;
  }
};
</script>
