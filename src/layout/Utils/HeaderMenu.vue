<template>
  <Menu v-model="current" mode="horizontal" class="header-menu">
    <MenuItem class="header-menu-item" key="mail">
      <a-icon type="code-sandbox" />演示
    </MenuItem>
    <MenuItem class="header-menu-item" key="app">
      <a-icon type="read" />文档
    </MenuItem>
  </Menu>
</template>

<script>
import { Menu } from "ant-design-vue";

export default {
  components: {
    Menu,
    MenuItem: Menu.Item
  },
  data() {
    return {
      current: ["mail"]
    };
  }
};
</script>

<style lang="less" scoped>
.header-menu {
  line-height: 63px;
  background: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0);
}
</style>
