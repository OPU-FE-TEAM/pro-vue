<template>
  <div id="app">
    <ConfigProvider :locale="zh_CN">
      <router-view />
    </ConfigProvider>
  </div>
</template>

<script>
import { ConfigProvider } from "ant-design-vue";

import { AppDeviceEnquire } from "@/utils/mixin";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  name: "BasicLayout",
  mixins: [AppDeviceEnquire],

  components: {
    ConfigProvider
  },
  provide() {
    return {};
  },

  data() {
    return {
      zh_CN
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less"></style>
