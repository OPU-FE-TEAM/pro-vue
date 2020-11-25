import settingDrawer from "./setting";
import { logout } from "@/api/auth";
import { mapActions } from "vuex";

export default {
  props: {
    theme: {
      type: Object,
      default: () => {}
    },
    device: String
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["setUserInfo", "setToken", "setMenus", "setAddRouters"]),
    openSetting() {
      settingDrawer({
        theme: this.theme
      });
    },
    handleLogout() {
      const that = this;

      this.$confirm({
        title: "提示",
        content: "真的要注销登录吗 ?",
        onOk() {
          logout({})
            .then(() => {
              that.$message.success("退出成功");
              that.logout();
            })
            .catch(() => {
              that.$router.push({
                name: "login"
              });
            });
        },
        onCancel() {}
      });
    }
  },
  render() {
    const { openSetting, theme, device } = this;
    return (
      <div class={[`header-action-wrapper`]}>
        <div class="header-action-content">
          <div class="header-action-item">
            <a-icon type="lock" />
          </div>
          <div class="header-action-item">
            <a-icon type="reload" />
          </div>
          {theme.isUserSet && (
            <div class="header-action-item" {...{ on: { click: openSetting } }}>
              <a-icon type="setting" />
            </div>
          )}
        </div>
        <div class="header-user">
          <a-dropdown>
            <span class="user-dropdown-menu">
              <a-avatar
                class="avatar"
                size="small"
                style="backgroundColor:#87d068"
                icon="user"
              />
              {device != "mobile" && <span class="user-name">Admin</span>}
            </span>
            <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
              <a-menu-item key="1">
                <a-icon type="setting" />
                <span>账户设置</span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3">
                <a href="javascript:;">
                  <a-icon type="logout" />
                  <span>退出登录</span>
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    );
  }
};
