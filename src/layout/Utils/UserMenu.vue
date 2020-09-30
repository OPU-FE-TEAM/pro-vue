<template>
  <div class="user-wrapper" :class="theme.layoutMode">
    <div class="content-box">
      <router-link :to="{ name: 'index' }">
        <span class="action">
          <Icon type="home" />
        </span>
      </router-link>

      <a href="javascript:;">
        <span class="action">
          <Icon type="bell" />
        </span>
      </a>

      <a href="javascript:;" v-if="theme.isUserSet" @click="showSetting">
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
            userInfo && userInfo.username ? userInfo.username : "admin"
          }}</span>
        </span>
        <Menu slot="overlay" class="user-dropdown-menu-wrapper">
          <!-- <MenuItem key="0">
            <router-link :to="{ name: 'center' }">
              <Icon type="user" />
              <span>个人中心</span>
            </router-link>
          </MenuItem>
          <MenuItem key="1">
            <router-link :to="{ name: 'settings' }">
              <Icon type="setting" />
              <span>账户设置</span>
            </router-link>
          </MenuItem>
          <MenuDivider /> -->
          <MenuItem key="2">
            <a href="javascript:;" @click="handleEditPassword">
              <Icon type="edit" />
              <span>修改密码</span>
            </a>
          </MenuItem>
          <MenuDivider />
          <MenuItem key="3">
            <a href="javascript:;" @click="handleLogout">
              <Icon type="logout" />
              <span>退出登录</span>
            </a>
          </MenuItem>
        </Menu>
      </Dropdown>
    </div>
    <!-- <EditPassword ref="EditPassword"></EditPassword> -->
  </div>
</template>

<script>
import { Dropdown, Icon, Avatar, Menu, Modal } from "ant-design-vue";
import { mapState, mapActions } from "vuex";
import authApi from "@/api/auth";
import setting from "../Setting";
import { mixin } from "./mixin";
// import EditPassword from "@/components/EditPassword/EditPassword.vue";
export default {
  name: "UserMenu",
  components: {
    Dropdown,
    Icon,
    Menu,
    MenuItem: Menu.Item,
    MenuDivider: Menu.Divider,
    Avatar
    // EditPassword
  },
  mixins: [mixin],
  computed: {
    ...mapState({
      userInfo: state => state.user.info
    })
  },
  data() {
    return {
      // showSetting: true
    };
  },
  methods: {
    ...mapActions(["logout", "setMenus"]),
    showSetting() {
      setting();
    },
    handleEditPassword() {
      this.$refs.EditPassword.show();
    },
    handleLogout() {
      const that = this;

      Modal.confirm({
        title: "提示",
        content: "真的要注销登录吗 ?",
        onOk() {
          authApi
            .logout({})
            .then(() => {
              that.$message.success("退出成功");
              that.logout();
              that.setMenus([]);
            })
            .catch(err => {
              that.$message.error({
                title: "错误",
                description: err.message
              });
            });
        },
        onCancel() {}
      });
    }
  }
};
</script>

<style lang="less" scoped>
// .user-wrapper {
//   float: right;
//   height: 100%;
//   line-height: 34px;

//   .action {
//     cursor: pointer;
//     padding: 0 12px;
//     display: inline-block;
//     transition: all 0.3s;
//     height: 100%;
//     color: rgba(0, 0, 0, 0.65);

//     &:hover {
//       background: rgba(0, 0, 0, 0.025);
//     }

//     .avatar {
//       // margin: 20px 8px 20px 0;
//       background: hsla(0, 0%, 100%, 0.85);
//       vertical-align: middle;
//     }

//     .icon {
//       font-size: 16px;
//       padding: 4px;
//     }
//   }
// }

.user-wrapper {
  float: right;
  height: 100%;

  .action {
    cursor: pointer;
    padding: 0 12px;
    display: inline-block;
    transition: all 0.3s;
    height: 100%;
    color: rgba(0, 0, 0, 0.65);

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }

    .avatar {
      margin: 20px 8px 20px 0;
      background: hsla(0, 0%, 100%, 0.85);
      vertical-align: middle;
    }

    .icon {
      font-size: 16px;
      padding: 4px;
    }
  }

  &.sidemenu {
    line-height: 34px;
    .avatar {
      margin: 0;
    }
  }
}
</style>
