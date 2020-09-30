import store from "@/store/";

const mixin = {
  data() {
    return {
      theme: store.getters.theme,
      lessNodesAppended: false
    };
  },
  computed: {
    layoutModeClass() {
      let layoutClass = [
        "layout-theme-" + this.theme.layoutMode,
        "layout-menu-" + this.theme.menuMode
      ];
      if (this.theme.layoutFixed) layoutClass.push("layout-fixed");
      return layoutClass;
    }
  },
  created() {},
  methods: {
    drawerClose() {
      if (this.collapsed || this.collapsed === false) {
        this.collapsed = !this.collapsed;
      }
    }
  }
};

export { mixin };
