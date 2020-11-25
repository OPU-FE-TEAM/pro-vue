<template>
  <div id="app">
    <a-config-provider :locale="zh_CN">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import { AppDeviceEnquire } from "@/utils/mixin";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  name: "BasicLayout",
  mixins: [AppDeviceEnquire],

  components: {},
  provide() {
    return {};
  },
  data() {
    return {
      zh_CN
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less"></style>
