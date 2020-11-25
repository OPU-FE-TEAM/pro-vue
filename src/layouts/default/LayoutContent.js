import PageLayout from "../page/index";

export default {
  props: {
    theme: {
      type: Object,
      default: () => {}
    }
  },
  render() {
    const { theme } = this;
    return (
      <a-layout-content class={[`layout-content`, theme.contentMode]}>
        <PageLayout theme={theme} />
      </a-layout-content>
    );
  }
};
