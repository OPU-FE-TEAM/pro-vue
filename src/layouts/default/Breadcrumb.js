import { utils } from "opu-components-vue";

export default {
  props: {
    menus: {
      type: Array,
      required: true
    }
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
      const menuTree = utils.findTree(
        this.menus,
        item => item.name === this.name
      );
      if (
        !(
          menuTree.nodes &&
          menuTree.nodes.length &&
          menuTree.nodes[0].name === this.name
        )
      ) {
        menuTree.nodes.unshift({
          meta: {
            title: "首页"
          },
          path: "/"
        });
      }

      this.breadList = menuTree.nodes;
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  render() {
    const { breadList, name } = this;
    const breadcrumbItems = breadList.map(item => {
      return (
        <a-breadcrumb-item key={item.path}>
          {item.name != name && (
            <router-link to={{ path: item.path }}>
              {item.meta.title}
            </router-link>
          )}
          {item.name == name && <span>{item.meta.title}</span>}
        </a-breadcrumb-item>
      );
    });
    return (
      <div class="layout-breadcrumb">
        <a-breadcrumb class="breadcrumb">{breadcrumbItems}</a-breadcrumb>
      </div>
    );
  }
};
