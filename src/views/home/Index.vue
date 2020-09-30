<script>
import { Card } from "ant-design-vue";
import { mapState } from "vuex";
import Dashboard from "../dashboard/Index";
export default {
  components: {
    Card,
    Dashboard
  },
  computed: {
    ...mapState({
      tabsPages: state => state.app.tabsPages,
      currentTab: state => state.app.currentTab
    })
  },
  watch: {
    currentTab(val) {
      // 当tab页打开时，触发tab页组件 tabShow方法
      const index = this.tabsPages.findIndex(p => p.fullPath === val.fullPath);
      const refName = "tabPage_" + index;
      if (index > -1 && this.$refs[refName] && this.$refs[refName].tabShow) {
        this.$refs[refName].tabShow(val);
      }
    }
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.tabsPages);
  },
  methods: {},
  render(h) {
    const pages = this.tabsPages.map((item, index) => {
      const itemOption = {
        ref: "tabPage_" + index,
        key: item.fullPath,
        props: {},
        style: {
          display: "none"
        }
      };

      if (item.fullPath === this.currentTab.fullPath) {
        itemOption.style = {
          display: "block"
        };
      }
      let template = "";
      if (item.name !== "home") {
        template = h(item.name, itemOption);
      } else {
        template = h("Dashboard", itemOption);
      }

      return template;
    });

    return <div>{pages}</div>;
  }
};
</script>

<style></style>
