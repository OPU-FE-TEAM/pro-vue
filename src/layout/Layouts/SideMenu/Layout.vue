<template>
  <div
    class="layout"
    :class="[
      device,
      ...layoutModeClass,
      { 'layout-split-open': menusSplitOpen }
    ]"
  >
    <Layout style="min-height: 100vh">
      <Drawer
        v-if="isMobile()"
        placement="left"
        :wrapClassName="`side-menu-drawer-wrap`"
        :bodyStyle="{ padding: '0px' }"
        :closable="false"
        :visible="collapsed"
        @close="drawerClose"
      >
        <div class="side-menu-drawer">
          <div class="side-menu-drawer-box">
            <logo :collapsed="false" />
            <Menu :menus="menus" :collapsed="false" activeName />
          </div>
        </div>
      </Drawer>

      <!-- 侧边栏导航 -->
      <LayoutSider
        v-else
        collapsible
        v-model="collapsed"
        :trigger="theme.menuMode === 'split' ? null : ''"
        class="layout-side"
      >
        <logo :collapsed="collapsed" />
        <Menu :menus="menus" :collapsed="collapsed" :activeName="activeName" />
      </LayoutSider>

      <Layout
        class="layout-box"
        :class="{
          'menu-collapsed': collapsed,
          'layout-theme-multiTab': theme.multiTab
        }"
      >
        <!-- 侧边栏导航头部 -->
        <!-- <a-layout-header
          class="layout-header"
          :style="{ 'background-color': theme.headerBackground }"
        >
          <Header
            :collapsed="collapsed"
            :showToggle="theme.menuMode === 'sidemenu'"
            @toggle="() => (collapsed = !collapsed)"
          />
        </a-layout-header>-->

        <!-- 侧边二级导航 -->
        <MenuSplit
          v-if="theme.menuMode === 'split'"
          class="layout-side-split"
          v-model="menusSplitOpen"
          :menus="menusSplitData"
        />

        <!-- 多页签 -->
        <multi-tab v-if="theme.multiTab" class="layout-multiTab"></multi-tab>

        <LayoutContent class="layout-content">
          <route-view />
          <!-- <LayoutFooter>
            <page-footer />
          </LayoutFooter> -->
        </LayoutContent>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import "../index.less";
import "./index.less";
import { Layout, Drawer } from "ant-design-vue";

import { mixinDevice } from "@/utils/mixin";
import { RouteView, Logo, Menu, MenuSplit } from "../../Utils";
import MultiTab from "../../MultiTab";
// import { PageFooter } from "../../Page";
import { mixin } from "../../Utils/mixin";
// import { DEVICE_TYPE } from "@/utils/device";

export default {
  name: "LayoutSideMenu",
  components: {
    Layout,
    Drawer,
    LayoutContent: Layout.Content,
    LayoutSider: Layout.Sider,
    // LayoutFooter: Layout.Footer,

    Logo,
    Menu,
    MenuSplit,
    RouteView,
    // PageFooter,
    MultiTab
  },
  mixins: [mixin, mixinDevice],
  props: {
    menus: {
      type: Array,
      required: true
    },
    menuSplitData: {
      type: Object,
      default: () => {}
    },
    activeName: {
      type: String,
      default: ""
    },

    menusSplitData: {
      type: Object,
      default: () => {}
    }
  },
  // watch: {
  //   device(val) {
  //     // switch (val) {
  //     //   case DEVICE_TYPE.DESKTOP:
  //     //     this.collapsed = false;
  //     //     break;
  //     //   case DEVICE_TYPE.TABLET:
  //     //     this.collapsed = true;
  //     //     break;
  //     //   case DEVICE_TYPE.MOBILE:
  //     //   default:
  //     //     this.collapsed = true;
  //     //     break;
  //     // }
  //   }
  // },

  data() {
    return {
      collapsed: false,
      menusSplitOpen: true
    };
  },

  computed: {},
  created() {
    if (this.theme.menuMode === "split") {
      this.collapsed = true;
    }
    if (this.isMobile()) {
      this.collapsed = false;
    }
  },
  mounted() {},
  methods: {}
};
</script>
