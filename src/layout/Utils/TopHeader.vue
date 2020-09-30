<template>
  <div class="layout-header">
    <div class="header-box">
      <div v-if="!isMobile()" class="header-left">
        <logo class="logo" />
        <Menu
          class="menu"
          :menus="menus"
          :collapsed="collapsed"
          :activeName="activeName"
          mode="horizontal"
          style="height:64px;line-height:64px;"
        />
      </div>
      <div v-else class="header-left">
        <Icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="setCollapsed"
        />
      </div>
      <div class="header-right">
        <UserMenu class="top-header-user" />
      </div>
    </div>
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
          <Menu :menus="menus" :collapsed="false" activeName="" />
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { Drawer, Icon } from "ant-design-vue";
import { mixinDevice } from "@/utils/mixin";
// import { mixin } from "./mixin";

import UserMenu from "./UserMenu";
import Logo from "./Logo";
import Menu from "./Menu";
export default {
  name: "TopHeader",
  components: {
    Drawer,
    Icon,
    Logo,
    Menu,
    UserMenu
  },
  mixins: [mixinDevice],

  props: {
    menus: {
      type: Array,
      required: false,
      default() {
        return [];
      }
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
  methods: {
    setCollapsed() {
      this.$emit("toggle");
    },
    drawerClose() {
      this.$emit("toggle");
    }
  }
};
</script>

<style lang="less" scoped>
.layout-header {
  width: 100%;
  .header-box {
    display: flex;
    padding: 0 16px;
    width: 100%;
    .header-left {
      flex: 1;
      display: flex;
      .trigger {
        padding: 21px;
        font-size: 22px;
      }
      .logo {
        overflow: hidden;
        width: 160px;
        position: relative;
      }
      .menu {
        flex: 0 1 auto;
        white-space: normal;
        width: 100%;
      }
    }
  }
}
</style>
