import { mapState } from "vuex";
import HeaderActions from "../HeaderActions";
/**
 * @description: 过滤所有固定路由
 */
function filterAffixTabs(routes) {
  const tabs = routes.filter(route => {
    if (route.meta && route.meta.affix) {
      return true;
    }
    return false;
  });
  return tabs;
}

export default {
  name: "MultiTab",
  props: {
    theme: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      pagePathList: [],
      //   pagePathList: [],
      pages: [],
      activeKey: "",
      newTabIndex: 0
    };
  },
  computed: {
    ...mapState({
      routers: state => state.app.routers
    })
  },
  created() {
    //   events
    //     .$on("open", val => {
    //       if (!val) {
    //         throw new Error(`multi-tab: open tab ${val} err`);
    //       }
    //       this.activeKey = val;
    //     })
    //     .$on("close", val => {
    //       if (!val) {
    //         this.closeThat(this.activeKey);
    //         return;
    //       }
    //       this.closeThat(val);
    //     });
    const affixTabs = filterAffixTabs(this.routers);
    if (affixTabs && affixTabs.length) {
      this.pages = [...affixTabs];
      this.pagePathList = affixTabs.map(p => p.path);
    }
    const currentRoute = affixTabs.find(p => p.path === this.$route.path);
    if (!(currentRoute && currentRoute.path)) {
      this.pages.push(this.$route);
      this.pagePathList.push(this.$route.path);
    }

    this.selectedLastPath();
  },
  methods: {
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    remove(targetKey) {
      this.pages = this.pages.filter(page => page.path !== targetKey);
      this.pagePathList = this.pagePathList.filter(path => path !== targetKey);
      // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
      if (!this.pagePathList.includes(this.activeKey)) {
        this.selectedLastPath();
      }
    },
    selectedLastPath() {
      this.activeKey = this.pagePathList[this.pagePathList.length - 1];
    },

    // content menu
    closeThat(e) {
      this.remove(e);
    },
    closeLeft(e) {
      const currentIndex = this.pagePathList.indexOf(e);
      if (currentIndex > 0) {
        this.pages.forEach(item => {
          if (item.path !== e && !(item.meta && item.meta.affix)) {
            this.remove(item.path);
          }
        });
      } else {
        this.$message.info("左侧没有标签");
      }
    },
    closeRight(e) {
      const currentIndex = this.pagePathList.indexOf(e);
      if (currentIndex < this.pagePathList.length - 1) {
        this.pagePathList.forEach((item, index) => {
          if (index > currentIndex) {
            this.remove(item);
          }
        });
      } else {
        this.$message.info("右侧没有标签");
      }
    },
    closeAll(e) {
      this.pages.forEach(item => {
        if (item.path !== e && !(item.meta && item.meta.affix)) {
          this.remove(item.path);
        }
      });
    },
    closeMenuClick({ key, item, domEvent }) {
      const vkey = domEvent.target.getAttribute("data-vkey");
      switch (key) {
        case "close-right":
          this.closeRight(vkey);
          break;
        case "close-left":
          this.closeLeft(vkey);
          break;
        case "close-all":
          this.closeAll(vkey);
          break;
        default:
        case "close-that":
          this.closeThat(vkey);
          break;
      }
    },
    renderTabPaneMenu(e) {
      return (
        <a-menu {...{ on: { click: this.closeMenuClick } }}>
          <a-menu-item key="close-that" data-vkey={e}>
            关闭当前标签
          </a-menu-item>
          <a-menu-item key="close-right" data-vkey={e}>
            关闭右侧
          </a-menu-item>
          <a-menu-item key="close-left" data-vkey={e}>
            关闭左侧
          </a-menu-item>
          <a-menu-item key="close-all" data-vkey={e}>
            关闭全部
          </a-menu-item>
        </a-menu>
      );
    },
    // render
    renderTabPane(title, keyPath) {
      const menu = this.renderTabPaneMenu(keyPath);

      return (
        <a-dropdown overlay={menu} trigger={["contextmenu"]}>
          <span style={{ userSelect: "none" }}>{title}</span>
        </a-dropdown>
      );
    }
  },
  watch: {
    $route: function(newVal) {
      this.activeKey = newVal.path;
      if (this.pagePathList.indexOf(newVal.path) < 0) {
        this.pagePathList.push(newVal.path);
        this.pages.push(newVal);
      }
    },
    activeKey: function(newPathKey) {
      if (this.$route.path !== newPathKey) {
        this.$router.push({ path: newPathKey });
      }
    }
  },
  render() {
    const {
      theme,
      onEdit,
      $data: { pages }
    } = this;
    const panes = pages.map(page => {
      return (
        <a-tab-pane
          style={{ height: 0 }}
          tab={this.renderTabPane(page.meta.title, page.path)}
          key={page.path}
          closable={!(page.meta && page.meta.affix)}
        />
      );
    });

    let tabBarExtraContent = "";
    if (theme && theme.headerActionPosition === "multiTabs") {
      tabBarExtraContent = (
        <template slot="tabBarExtraContent">
          <HeaderActions theme={theme} />
        </template>
      );
    }
    return (
      <div class="multi-tab-wrapper">
        <a-tabs
          hideAdd
          type={"editable-card"}
          v-model={this.activeKey}
          size="small"
          tabBarStyle={{
            background: "#FFF",
            margin: 0,
            paddingTop: "3px",
            paddingLeft: "10px",
            paddingRight: "10px"
          }}
          {...{ on: { edit: onEdit } }}
        >
          {panes}
          {tabBarExtraContent}
        </a-tabs>
      </div>
    );
  }
};
