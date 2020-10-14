<template>
  <div class="user-wrapper" :class="theme.layoutMode">
    <div class="content-box">
      <a href="javascript:;">
        <span class="action" @click="showMessage">
          <Icon type="bell" />
          <div class="count" v-if="messageVisible && messageCount > 0">
            {{ messageCount }}
          </div>
        </span>
      </a>

      <a href="javascript:;" @click="showSetting">
        <span class="action">
          <Icon type="setting" />
        </span>
      </a>
      <Dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <Avatar
            class="avatar"
            size="small"
            style="backgroundColor:#87d068"
            icon="user"
          />
          <span>{{
            userInfo && userInfo.operatorName ? userInfo.operatorName : "admin"
          }}</span>
        </span>
        <Menu slot="overlay" class="user-dropdown-menu-wrapper">
          <MenuItem key="2">
            <a href="javascript:;" @click="handleEditPassword">
              <Icon type="edit" />
              <span>修改密码</span>
            </a>
          </MenuItem>
          <!-- <MenuItem key="3">
            <a href="javascript:;" @click="handleSetMessage">
              <Icon type="bell" />
              <span>消息弹出设置</span>
            </a>
          </MenuItem> -->
          <MenuDivider />
          <MenuItem key="4">
            <a href="javascript:;" @click="handleLogout">
              <Icon type="logout" />
              <span>退出登录</span>
            </a>
          </MenuItem>
        </Menu>
      </Dropdown>
    </div>
    <EditPassword ref="EditPassword"></EditPassword>
    <!-- <setMessage ref="setMessage"></setMessage> -->
    <!-- <autoMessage
      ref="autoMessage"
      @messageCountVisible="messageCountVisible"
    ></autoMessage> -->
  </div>
</template>

<script>
import { Dropdown, Icon, Avatar, Menu, Modal, message } from "ant-design-vue";
import { mapState, mapActions } from "vuex";
import { logout } from "@/api/auth";
import setting from "../Setting";
import { mixin } from "./mixin";
import EditPassword from "@/components/tools/EditPassword.vue";
// import setMessage from "@/components/setMessage.vue";
// import autoMessage from "@/components/autoMessage.vue";
// import config from "@/config/baseConfig";
// import autoMessageApi from "@/api/autoMessage";
export default {
  name: "UserMenu",
  components: {
    Dropdown,
    Icon,
    Menu,
    MenuItem: Menu.Item,
    MenuDivider: Menu.Divider,
    Avatar,
    EditPassword,
    // autoMessage,
    // setMessage
  },
  mixins: [mixin],
  computed: {
    ...mapState({
      userInfo: state => state.user.info,
      token: state => state.user.token
    })
  },
  data() {
    return {
      messageCount: 5,
      messageVisible: true
      // showSetting: true
    };
  },
  mounted() {
    let self = this;
    let token = this.token;
    // eslint-disable-next-line no-undef
    // let connection = new signalR.HubConnectionBuilder()
    //   .withUrl(config.http.serverUrl + "/wmsHub", {
    //     accessTokenFactory: () => token,
    //     skipNegotiation: true,
    //     // eslint-disable-next-line no-undef
    //     transport: signalR.HttpTransportType.WebSockets
    //   })
    //   .build();
    // connection.on("showMessage", res => {
    //   self.messageCount = res.count;
    //   if (res.isPop) {
    //     self.showMessage();
    //   }
    //   if (res.billType) {
    //     self.addTabReloadData(res.billType);
    //   }
    // });

    // connection
    //   .start()
    //   .then(() => {
    //     self.initMessageCount();
    //   })
    //   .catch(error => {
    //     return console.log(error);
    //   });
  },
  methods: {
    ...mapActions([
      "logout",
      "setAddRouters",
      "setIsRegTabsPage",
      "setCurrentTab",
      "setTabsPages",
      "addTabReloadData"
    ]),
    initMessageCount() {
      autoMessageApi
        .getAutoMessageList({
          pageIndex: 0,
          pageSize: 1
        })
        .then(res => {
          this.messageCount = res.data.unReadCount;
        });
    },
    showSetting() {
      setting();
    },
    showMessage() {
      // this.$refs.autoMessage.show();
    },
    messageCountVisible(type) {
      this.messageVisible = type;
    },
    handleEditPassword() {
      this.$refs.EditPassword.show();
    },
    handleSetMessage() {
      // this.$refs.setMessage.show();
    },
    handleLogout() {
      const that = this;

      Modal.confirm({
        title: "提示",
        content: "真的要注销登录吗 ?",
        onOk() {
          logout({})
            .then(res => {
              that.$message.success("退出成功");
              that.setIsRegTabsPage(false);
              that.setCurrentTab({});
              that.setTabsPages("");
              that.setAddRouters([]);
              that.logout();
            })
            .catch(err => {
              that.$router.push({
                name: "login"
              });
              // that.$message.error({
              //   title: "错误",
              //   description: err.message
              // });
            });
        },
        onCancel() {}
      });
    }
  }
};
</script>

<style lang="less" scoped>
@countW: 20px;

.user-wrapper {
  float: right;
  height: 100%;

  .action {
    cursor: pointer;
    padding: 1px 10px;
    display: inline-block;
    transition: all 0.3s;
    height: 100%;
    color: rgba(0, 0, 0, 0.65);
    position: relative;
    &.user-dropdown-menu {
      padding-left: 40px;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }

    .avatar {
      // margin: 20px 8px 20px 0;
      background: hsla(0, 0%, 100%, 0.85);
      vertical-align: middle;
      background: hsla(0, 0%, 100%, 0.85);
      vertical-align: middle;
      float: left;
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }

    .icon {
      font-size: 16px;
      padding: 4px;
    }

    .count {
      position: absolute;
      right: -2px;
      top: -2px;
      height: @countW;
      line-height: @countW;
      border-radius: 10px;
      min-width: @countW;
      background: #f5222d;
      color: #fff;
      text-align: center;
    }
  }

  &.sidemenu {
    line-height: 34px;
    .avatar {
      // margin: 0;
    }
  }
}
.shop-dropdown-menu {
  padding-right: 0 !important;
  .shop-dropdown-title {
    border: 1px solid #ddd;
    padding: 7px 19px 7px 10px;
    border-radius: 4px;
    position: relative;
    &::after {
      content: "";
      width: 0;
      height: 0;
      border-top: 5px solid #ddd;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      position: absolute;
      right: 5px;
      top: 15px;
    }
  }
}
.shop-dropdown-menu-wrapper {
  .menu-item {
    .icon {
      width: 18px;
      height: 18px;
      border: 1px solid #ddd;
      display: inline-block;
      border-radius: 20px;
      text-align: center;
      line-height: 18px;
      color: #fff;
      margin-right: 10px;
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
