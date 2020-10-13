<script>
import events from "./events";
import { mapActions } from "vuex";

export default {
  name: "MultiTab",
  data() {
    return {
      fullPathList: [],
      pages: [],
      activeKey: "",
      newTabIndex: 0
    };
  },
  created() {
    events
      .$on("open", val => {
        if (!val) {
          throw new Error(`multi-tab: open tab ${val} err`);
        }
        this.activeKey = val;
      })
      .$on("close", val => {
        if (!val) {
          this.closeThat(this.activeKey);
          return;
        }
        this.closeThat(val);
      });
    this.pages.push(this.$route);
    this.fullPathList.push(this.$route.fullPath);
    this.selectedLastPath();
  },
  methods: {
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    remove(targetKey) {
      this.pages = this.pages.filter(page => page.fullPath !== targetKey);
      this.fullPathList = this.fullPathList.filter(path => path !== targetKey);
      // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
      if (!this.fullPathList.includes(this.activeKey)) {
        this.selectedLastPath();
      }
    },
    selectedLastPath() {
      this.activeKey = this.fullPathList[this.fullPathList.length - 1];
    },

    // content menu
    closeThat(e) {
      this.remove(e);
    },
    closeLeft(e) {
      const currentIndex = this.fullPathList.indexOf(e);
      if (currentIndex > 0) {
        this.fullPathList.forEach((item, index) => {
          if (index < currentIndex) {
            this.remove(item);
          }
        });
      } else {
        this.$message.info("左侧没有标签");
      }
    },
    closeRight(e) {
      const currentIndex = this.fullPathList.indexOf(e);
      if (currentIndex < this.fullPathList.length - 1) {
        this.fullPathList.forEach((item, index) => {
          if (index > currentIndex) {
            this.remove(item);
          }
        });
      } else {
        this.$message.info("右侧没有标签");
      }
    },
    closeAll(e) {
      const currentIndex = this.fullPathList.indexOf(e);
      this.fullPathList.forEach((item, index) => {
        if (index !== currentIndex) {
          this.remove(item);
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
      this.activeKey = newVal.fullPath;
      if (this.fullPathList.indexOf(newVal.fullPath) < 0) {
        this.fullPathList.push(newVal.fullPath);
        this.pages.push(newVal);
      }
    },
    activeKey: function(newPathKey) {
      this.$router.push({ path: newPathKey });
    }
  },
  render() {
    const {
      onEdit,
      $data: { pages }
    } = this;
    const panes = pages.map(page => {
      return (
        <a-tab-pane
          style={{ height: 0 }}
          tab={this.renderTabPane(page.meta.title, page.fullPath)}
          key={page.fullPath}
          closable={pages.length > 1}
        />
      );
    });

    return (
      <div class="multi-tab">
        <div class="multi-tab-wrapper">
          <a-tabs
            hideAdd
            type={"editable-card"}
            v-model={this.activeKey}
            tabBarStyle={{
              background: "#FFF",
              margin: 0,
              paddingLeft: "16px",
              paddingTop: "1px"
            }}
            {...{ on: { edit: onEdit } }}
          >
            {panes}
          </a-tabs>
        </div>
      </div>
    );
  }
};
</script>

<style lang="less" scoped>
.multi-tab {
  padding-top: 10px;
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
