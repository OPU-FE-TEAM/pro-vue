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
  render() {
    const { $env, theme, device } = this;
    return (
      <div class="layout-logo">
        <span class="logo-img">
          <img src="/images/logo.png" />
        </span>
        {(!theme.sideCollapsed || device == "mobile") && (
          <span class="logo-text">{$env.APP_TITLE}</span>
        )}
      </div>
    );
  }
};
