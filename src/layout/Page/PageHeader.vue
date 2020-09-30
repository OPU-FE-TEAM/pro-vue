<template>
  <div class="page-header" :class="this.theme.layoutMode">
    <!-- <breadcrumb /> -->
    <div v-if="title" class="title">{{ title }}</div>
    <!-- <div v-if="$slots.title" class="title"><slot name="title"></slot></div> -->
    <div v-if="desc" class="desc">{{ desc }}</div>
    <div v-if="$slots.desc" class="desc"><slot name="desc"></slot></div>

    <div class="page-menu-tabs" v-if="tabs && tabs.items">
      <Tabs
        :tabBarStyle="{ margin: 0 }"
        :activeKey="tabs.active()"
        @change="tabs.callback"
      >
        <TabsPane
          v-for="item in tabs.items"
          :tab="item.title"
          :key="item.key"
        ></TabsPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { Tabs } from "ant-design-vue";

// import { Breadcrumb } from "../Utils";
import { mixin } from "../Utils/mixin";

export default {
  components: {
    Tabs,
    TabsPane: Tabs.TabPane
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    },
    tabs: {
      type: Object,
      default: () => {}
    }
  },
  mixins: [mixin]
};
</script>

<style lang="less" scoped>
.page-header {
  padding: 0 10px 0 10px;
  background: #fff;
  overflow: hidden;
  // &.topmenu {
  //   background: #f1f1f1;
  //   padding: 10px 50px 0 70px;
  // }
  .title {
    font-size: 20px;
    color: #333;
    margin-top: 10px;
  }
  .desc {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
