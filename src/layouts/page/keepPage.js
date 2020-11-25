import { mapState } from "vuex";
import exceptionPage404 from "@/views/exception/404";
export default {
  components: {
    exceptionPage404
  },
  props: {
    theme: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState({
      keepPages: state => state.app.keepPages
    })
  },
  render(h) {
    const { keepPages, $route } = this;
    const pages = keepPages.map((item, index) => {
      const itemOption = {
        ref: "keepPage_" + index,
        key: item.fullPath,
        props: {},
        style: {
          display: "none"
        }
      };

      if (item.fullPath === $route.fullPath) {
        itemOption.style = {
          display: "block"
        };
      }
      let template = "";
      if (item.name !== "home") {
        template = h(item.name, itemOption);
      } else {
        template = h("exceptionPage404", itemOption);
      }

      return template;
    });

    return <div>{pages}</div>;
  }
};
