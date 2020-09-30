<!--
 * @Description: 
 * @Author: HG
 * @Date: 2019-07-30 16:42:44
 * @LastEditors: HG
 * @LastEditTime: 2019-09-06 16:39:57
 -->
<template>
  <div class="footer">
    <div class="links">
      <a href="https://pro.loacg.com/" target="_blank">首页</a>
      <a href="https://github.com/sendya/ant-design-pro-vue" target="_blank">
        <Icon type="github" />
      </a>
      <a href="https://ant.design/">Ant Design</a>
      <a href="https://vue.ant.design/">Vue Antd</a>
    </div>
    <div class="copyright">
      Copyright
      <Icon type="copyright" /> 2018 <span></span>
    </div>
  </div>
</template>

<script>
import { Icon } from "ant-design-vue";

export default {
  name: "PageFooter",
  components: {
    Icon
  }
};
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
