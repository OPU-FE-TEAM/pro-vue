<script>
import { Tabs, Dropdown, Menu } from "ant-design-vue";
import UserMenu from "../Utils/UserMenu";
import events from "./events";
import { mapState, mapActions } from "vuex";
import { mixin } from "../Utils/mixin"; 

// import cloneDeep from "lodash/cloneDeep";
// import { setCurrentUrl } from "@/utils/common";

export default {
  name: "MultiTab",
  components: {
    Tabs,
    TabsPane: Tabs.TabPane,
    Dropdown,
    Menu,
    MenuItem: Menu.Item,
    UserMenu
  },
  mixins: [mixin],
  data() {
    return {
      // pageNameList: [],
      fullPathList: [],
      pages: [],
      activeKey: "",
      newTabIndex: 0
    };
  },
  computed: {
    ...mapState({
      tabsPages: state => state.app.tabsPages,
      currentTab: state => state.app.currentTab
    })
  },
  created() {
    events
      .$on("open", val => {
        if (!val) {
          throw new Error(`multi-tab: open tab ${val} err`);
        }
        this.onChange(val);
      })
      .$on("close", val => {
        if (!val) {
          this.closeThat(this.currentTab.fullPath);
          return;
        }
        this.closeThat(val);
      })
      .$on("closeAll", () => {
        this.closeAll();
      })
      .$on("rename", ({ key, name }) => {
        try {
          // const pages = cloneDeep(this.pages);
          const item = this.tabsPages.find(item => item.fullPath === key);
          // console.log(item);
          // debugger;

          item.title = name;
          // console.log("rename", this.pages, key, name, item);
          // debugger;
          // this.$forceUpdate();
        } catch (e) {}
      });

    // this.pages.push(this.$route);
    // this.pageNameList.push(this.$route.name);
    // this.fullPathList.push(this.$route.fullPath);
    this.selectedLastPath();
  },
  methods: {
    ...mapActions(["setCurrentTab", "setTabsPages"]),
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    onChange(key) {
      const tab = this.tabsPages.find(p => p.fullPath === key);
      if (tab) {
        this.setCurrentTab(tab);
        // const url =
        //   window.location.protocol + "//" + window.location.host + tab.fullPath;
        // setCurrentUrl(url);
      }
    },
    remove(targetKey) {
      if (targetKey === '/home') return;
      // const index = this.tabsPages.findIndex(page => page.fullPath === targetKey);
      // const name = this.pages[index].name;
      const pages = this.tabsPages.filter(page => page.fullPath !== targetKey);
      this.setTabsPages(pages);
      if (this.currentTab.fullPath === targetKey) {
        this.selectedLastPath();
      }
      // this.fullPathList = this.fullPathList.filter(path => path !== targetKey);
      // // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
      // if (!this.fullPathList.includes(this.activeKey)) {
      //   this.selectedLastPath();
      // }
      // this.noKeepAlive(name);
    },
    selectedLastPath() {
      const page = this.tabsPages[this.tabsPages.length - 1];
      this.setCurrentTab(page);
    },

    // content menu
    closeThat(e) {
      this.remove(e);
    },
    closeLeft(e) {
      const currentIndex = this.tabsPages.findIndex(p => p.fullPath === e);
      if (currentIndex > 0) {
        this.tabsPages.forEach((item, index) => {
          if (index < currentIndex) {
            this.remove(item.fullPath);
          }
        });
      } else {
        this.$message.info("左侧没有标签");
      }
    },
    closeRight(e) {
      const currentIndex = this.tabsPages.findIndex(p => p.fullPath === e);

      if (currentIndex < this.tabsPages.length - 1) {
        this.tabsPages.forEach((item, index) => {
          if (index > currentIndex) {
            this.remove(item.fullPath);
          }
        });
      } else {
        this.$message.info("右侧没有标签");
      }
    },
    closeAll() {
      const pages = this.tabsPages.filter(
        page => page.fullPath == '/home'
      );
      this.setTabsPages(pages);
      this.selectedLastPath();
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
        <Menu {...{ on: { click: this.closeMenuClick } }}>
          <MenuItem key="close-that" data-vkey={e}>
            关闭当前标签
          </MenuItem>
          <MenuItem key="close-right" data-vkey={e}>
            关闭右侧
          </MenuItem>
          <MenuItem key="close-left" data-vkey={e}>
            关闭左侧
          </MenuItem>
          <MenuItem key="close-all" data-vkey={e}>
            关闭全部
          </MenuItem>
        </Menu>
      );
    },
    // render
    renderTabPane(title, keyPath) {
      const menu = this.renderTabPaneMenu(keyPath);

      return (
        <Dropdown overlay={menu} trigger={["contextmenu"]}>
          <span style={{ userSelect: "none" }}>{title}</span>
        </Dropdown>
      );
    }
  },

  render() {
    const { onEdit, onChange } = this;

    const panes = this.tabsPages.map((page, index) => {
      return (
        <TabsPane
          style={{ height: 0 }}
          tab={this.renderTabPane(page.title, page.fullPath)}
          key={page.fullPath}
          closable={index > 0}
        />
      );
    });

    let tabBarExtraContent = "";
    if (this.theme.layoutMode === "sidemenu") {
      tabBarExtraContent = <UserMenu />;
    }

    return (
      <div class="multi-tab">
        <div class="multi-tab-wrapper">
          <Tabs
            hideAdd
            type={"editable-card"}
            activeKey={this.currentTab.fullPath}
            tabBarStyle={{
              background: "#fafafa",
              margin: 0,
              paddingLeft: "16px",
              paddingTop: "1px"
            }}
            style="overflow:initial;"
            {...{ on: { edit: onEdit, change: onChange } }}
          >
            {panes}
            <template slot="tabBarExtraContent">{tabBarExtraContent}</template>
          </Tabs>
        </div>
      </div>
    );
  }
};
</script>

<style lang="less" scoped>
.multi-tab {
  padding-top: 2px;
  background: #fff;
  &.fixed {
    position: fixed;
    left: 200px;
    right: 0;
    top: 64px;
    z-index: 100;
    &.menu-collapsed {
      left: 80px;
    }

    &.split,
    &.split.sidemenu {
      left: 80px;
    }
    &.splitOpen.sidemenu,
    &.splitOpen.sidetopmenu {
      left: 260px;
    }
    &.topmenu {
      left: 0;
    }
    &.split.topmenu {
      top: 113px;
    }
  }
}
</style>
