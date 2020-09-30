<template>
  <Breadcrumb class="breadcrumb">
    <BreadcrumbItem v-for="(item, index) in breadList" :key="index">
      <router-link v-if="item.name != name" :to="{ path: item.path }">
        {{ item.meta.title }}
      </router-link>
      <span v-else>{{ item.meta.title }}</span>
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
import { Breadcrumb } from "ant-design-vue";

export default {
  components: {
    Breadcrumb,
    BreadcrumbItem: Breadcrumb.Item
  },
  data() {
    return {
      name: "",
      breadList: []
    };
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.breadList = [];

      this.name = this.$route.name;
      this.$route.matched.forEach(item => {
        // item.meta.name === 'dashboard' ? item.path = '/dashboard' : this.$route.path === item.path
        this.breadList.push(item);
      });
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>

<style scoped></style>
