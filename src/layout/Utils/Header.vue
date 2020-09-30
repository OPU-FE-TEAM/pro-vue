<template>
  <div class="layout-top">
    <Icon
      v-if="showToggle || !this.isDesktop()"
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="setCollapsed"
    />
    <div class="header-box">
      <div class="header-left">
        <header-menu v-if="this.isDesktop()" />
      </div>
      <div class="header-right">
        <UserMenu class="side-header-user" />
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "ant-design-vue";

import HeaderMenu from "./HeaderMenu";
import UserMenu from "./UserMenu";
import { mixinDevice } from "@/utils/mixin";

export default {
  name: "Header",
  mixins: [mixinDevice],
  components: {
    Icon,
    HeaderMenu,
    UserMenu
  },
  props: {
    collapsed: {
      type: Boolean,
      required: false,
      default: true
    },
    showToggle: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    setCollapsed() {
      this.$emit("toggle");
    }
  }
};
</script>

<style lang="less" scoped>
.layout-top {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin-left: -50px;
  margin-right: -50px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);

  .trigger {
    padding: 21px;
    font-size: 22px;
  }
  .header-box {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 0 16px;
    .header-left {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
    }
  }
}
</style>
