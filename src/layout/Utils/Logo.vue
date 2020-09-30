<template>
  <div class="layout-logo" :class="theme.layoutMode">
    <Popover
      v-if="theme.layoutMode === 'sidemenu'"
      title="切换仓库"
      placement="rightTop"
    >
      <template slot="content">
        <ul class="menu-list">
          <li
            class="menu-item"
            v-for="item in manageWarehouseList"
            :key="item.id"
            :class="{ active: item.id === currentWarehouse.id }"
            @click="setWarehouse(item)"
          >
            <span class="icon"><Icon type="check"/></span>
            {{ item.text }}
          </li>
        </ul>
      </template>
      <div class="logo-box" :class="{ 'show-text': !collapsed }">
        <span class="logo-img"><img src="/images/logo.jpg"/></span>
        <span
          class="logo-text"
          :style="{ color: textColor }"
          v-if="!collapsed || theme.layoutMode === 'topmenu'"
          >{{ env.APP_TITLE }}</span
        >
      </div>
    </Popover>
    <router-link v-else :to="{ name: 'index' }">
      <span class="logo-img"><img src="/images/logo.jpg"/></span>
      <span
        class="logo-text"
        :style="{ color: textColor }"
        v-if="!collapsed || theme.layoutMode === 'topmenu'"
        >{{ env.APP_TITLE }}</span
      >
    </router-link>
  </div>
</template>

<script>
import { Popover, Icon, Modal, message } from "ant-design-vue";
import { mixin } from "./mixin";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Popover,
    Icon
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
      // eslint-disable-next-line no-undef
      env
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.info,
      currentWarehouse: state => state.user.currentWarehouse
    }),
    // setCurrentWarehouse(){

    // },
    manageWarehouseList() {
      return this.userInfo.manageWarehouseList;
    },
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
  methods: {
    ...mapActions(["setCurrentWarehouse"]),
    setWarehouse(info) {
      if (info.id === this.currentWarehouse.id) {
        return false;
      }
      const that = this;
      Modal.confirm({
        title: "您确定切换仓库吗？",
        content: "确认将关闭当前所有页签，并执行刷新",
        okText: "确认",
        onOk() {
          // 关闭所有页签
          that.$multiTab.closeAll();
          that.setCurrentWarehouse(info);
          message.success("切换仓库成功!");
        },
        onCancel() {}
      });
    }
  }
};
</script>

<style lang="less" scoped>
.layout-logo {
  &.sidemenu {
    padding: 10px 12px;
    text-align: center;
    line-height: 0;
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
