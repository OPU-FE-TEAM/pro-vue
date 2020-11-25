<template>
  <div class="login">
    <div class="login-main">
      <div class="login-title">
        <span>欢迎使用 {{ env.APP_TITLE }}</span>
      </div>
      <div class="login-box">
        <a-card hoverable>
          <a-row>
            <a-col :xs="0" :sm="0" :md="18" :lg="18" :xl="18">
              <div class="login-ad">
                <img src="/images/login.png" alt="" />
              </div>
            </a-col>
            <a-col
              :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              :xl="6"
              style="padding-top:30px;"
            >
              <div class="title">登录</div>
              <a-form
                id="formLogin"
                class="login-form"
                ref="formLogin"
                :form="form"
                @submit="handleSubmit"
              >
                <a-form-item>
                  <a-input
                    size="large"
                    type="text"
                    placeholder="用户名"
                    v-decorator="[
                      'username',
                      {
                        rules: [{ required: true, message: '请输入登录账号' }]
                      }
                    ]"
                  >
                    <a-icon
                      slot="prefix"
                      type="user"
                      :style="{ color: 'rgba(0,0,0,.25)' }"
                    />
                  </a-input>
                </a-form-item>

                <a-form-item>
                  <a-input
                    size="large"
                    type="password"
                    autocomplete="false"
                    placeholder="登录密码"
                    v-decorator="[
                      'password',
                      {
                        rules: [{ required: true, message: '请输入密码' }],
                        validateTrigger: 'blur'
                      }
                    ]"
                  >
                    <a-icon
                      slot="prefix"
                      type="lock"
                      :style="{ color: 'rgba(0,0,0,.25)' }"
                    />
                  </a-input>
                </a-form-item>

                <a-form-item style="margin-top:24px">
                  <a-button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    class="login-button"
                    block
                    :loading="state.loginBtn"
                    :disabled="state.loginDisabled"
                    >确定</a-button
                  >
                </a-form-item>
              </a-form>
            </a-col>
          </a-row>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import { login } from "@/api/auth";
import { mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      env,
      form: this.$form.createForm(this),
      state: {
        loginBtn: false,
        loginDisabled: false
      }
    };
  },
  created() {
    this.setMenus([]);
    this.setAddRouters([]);
  },
  methods: {
    ...mapActions(["setUserInfo", "setToken", "setMenus", "setAddRouters"]),
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state
      } = this;

      state.loginBtn = true;

      this.loginSuccess({
        code: 0,
        data: {
          token: "123456",
          permissions: ["admin", "test"]
        }
      });

      // validateFields(
      //   ["username", "password"],
      //   { force: true },
      //   (err, values) => {
      //     if (!err) {
      //       const loginParams = { ...values };
      //       loginParams.password = md5(values.password);
      //       authApi
      //         .login(loginParams)
      //         .then(res => this.loginSuccess(res))
      //         .catch(err => this.requestFailed(err))
      //         .finally(() => {
      //           state.loginBtn = false;
      //         });
      //     } else {
      //       setTimeout(() => {
      //         state.loginBtn = false;
      //       }, 600);
      //     }
      //   }
      // );
    },
    loginSuccess(res) {
      const token = res.data.token;
      this.setToken(token);
      delete res.data.token;
      this.setUserInfo(res.data);
      this.$router.push({ name: "index" });

      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: "欢迎",
          description: `欢迎回来`
        });
      }, 1000);
    },
    requestFailed(err) {
      const description = err && err.msg ? err.msg : "请求出现错误，请稍后再试";
      this.$message.error(description);
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  background: #f1f1f1;
  height: 100vh;
  overflow: hidden;
  .login-main {
    width: 100%;
    max-width: 1100px;
    height: 400px;
    margin: 200px auto;
    .login-ad {
      padding-right: 40px;
      img {
        width: 100%;
      }
    }
    .login-title {
      font-size: 20px;
      margin-bottom: 16px;
      text-align: left;
    }
    .login-box {
      background: #fff;
      .title {
        font-size: 20px;
        text-align: center;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
