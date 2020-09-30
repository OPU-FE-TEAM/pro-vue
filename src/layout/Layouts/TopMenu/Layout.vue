<template>
  <div class="layout" :class="layoutModeClass">
    <Layout style="min-height: 100vh">
      <Layout
        class="layout-box"
        :class="{
          'menu-collapsed': collapsed,
          'layout-theme-multiTab': theme.multiTab
        }"
      >
        <!-- 顶部栏导航头部 -->
        <LayoutHeader
          :style="{ 'background-color': theme.menuBackground }"
          class="layout-header"
        >
          <TopHeader
            :menus="menus"
            :activeName="activeName"
            :collapsed="collapsed"
            @toggle="() => (collapsed = !collapsed)"
          />
          <!-- 顶部二级导航 -->
          <MenuSplit
            v-if="theme.menuMode === 'split'"
            class="layout-top-split"
            v-model="menusSplitOpen"
            mode="horizontal"
            :menus="menusSplitData"
          />
        </LayoutHeader>

        <!-- 多页签 -->
        <multi-tab v-if="theme.multiTab" class="layout-multiTab"></multi-tab>

        <LayoutContent class="layout-content">
          <route-view />
          <!-- <a-layout-footer>
            <page-footer />
          </a-layout-footer> -->
        </LayoutContent>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { Layout } from "ant-design-vue";
import { RouteView, TopHeader, MenuSplit } from "../../Utils";
import MultiTab from "../../MultiTab";
// import { PageFooter } from "../../Page";
import { mixin } from "../../Utils/mixin";
// import { updateTheme } from "../../Setting/settingConfig";
export default {
  name: "BasicLayout",
  components: {
    Layout,
    LayoutContent: Layout.Content,
    LayoutHeader: Layout.Header,
    MenuSplit,
    RouteView,
    TopHeader,
    // PageFooter,
    MultiTab
  },
  mixins: [mixin],
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

  data() {
    return {
      collapsed: false,
      menusSplitOpen: true
    };
  },

  computed: {},

  created() {},
  mounted() {},
  methods: {}
};
</script>
