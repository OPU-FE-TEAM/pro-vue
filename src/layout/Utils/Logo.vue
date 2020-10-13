<template>
  <div
    class="layout-logo"
    :class="[theme.layoutMode, { 'show-text': !collapsed }]"
  >
    <!-- <router-link :to="{ name: 'home' }"> -->
    <div class="logo-box" :class="{ 'show-text': !collapsed }">
      <span class="logo-img"><img src="/images/logo.jpg"/></span>
      <span
        class="logo-text"
        :style="{ color: textColor }"
        v-if="!collapsed || theme.layoutMode === 'topmenu'"
        >{{ env.APP_TITLE }}</span
      >
    </div>
    <!-- </router-link> -->
  </div>
</template>

<script>
import { Modal, message } from "ant-design-vue";
import { mixin } from "./mixin"; 
import { mapState, mapActions } from "vuex";

export default {
  components: {
    // Popover,
    // Icon
  },
  props: {
    collapsed: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  mixins: [mixin],
  data() {
    return { 
      env
    };
  },
  computed: {
    ...mapState({
      // userInfo: state => state.user.info,
    }),
    // setCurrentWarehouse(){

    // },
    // manageWarehouseList() {
    //   return this.userInfo.manageWarehouseList;
    // },
    textColor() {
      let color = "";
      if (
        this.theme.layoutMode === "topmenu" ||
        this.theme.layoutMode === "sidemenu"
      ) {
        color = this.theme.menuTextColor;
      } else {
        color = this.theme.headerTextColor;
      }
      return color;
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.layout-logo {
  &.sidemenu {
    padding: 10px 12px;
    text-align: center;
    line-height: 0;
    &.show-text {
      position: fixed;
      width: 200px;
      z-index: 1;
      background: #001529;
    }

    .logo-img {
      width: 55px;
      display: inline-block;
      border-radius: 40px;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
    .logo-box {
      &.show-text {
        display: flex;

        .logo-img {
          width: 35px;
          display: block;
        }
        .logo-text {
          line-height: 35px;
          display: block;
          flex: 1;
          text-align: left;
          padding-left: 10px;
        }
      }
    }
  }
  &.topmenu {
    height: 32px;
    background: rgba(0, 0, 0, 0.1);
    margin: 16px;
    text-align: center;
    line-height: 32px;
    .logo-img {
      width: 30px;
      display: inline-block;
      img {
        width: 100%;
      }
    }
  }
}
.menu-list {
  .menu-item {
    padding: 10px;
    cursor: pointer;
    .icon {
      width: 18px;
      height: 18px;
      border: 1px solid #ddd;
      display: inline-block;
      border-radius: 20px;
      text-align: center;
      line-height: 18px;
      color: #fff;
      i {
      }
    }
    &.active {
      color: #1890ff;
      .icon {
        border: 1px solid #1890ff;
        background: #1890ff;
        color: #fff;
      }
    }
    &:hover {
      color: #1890ff;
      .icon {
        border: 1px solid #1890ff;
      }
    }
  }
}
</style>
