import Logo from "./Logo";
import Menu from "./Menu";
import HeaderActions from "./HeaderActions";
import Breadcrumb from "./Breadcrumb";

export default {
  props: {
    menus: {
      type: Array,
      required: true
    },
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
    onDragLineChange(width) {
      this.width = width;
    }
  },
  render() {
    const { menus, theme, device } = this;
    const hasMenu = theme.layoutMode === "topmenu" || theme.menuSplit;
    const hasBreadcrumb =
      theme.showBreadCrumb &&
      theme.layoutMode !== "topmenu" &&
      !theme.menuSplit;
    return (
      <a-layout-header
        collapsible
        class={[`layout-header` /*, theme.headerTheme*/]}
      >
        {theme.layoutMode != "sidemenu" && theme.showLogo && (
          <Logo theme={theme} device={device} />
        )}
        <div class="layout-header-menu__content">
          {hasMenu && device != "mobile" && (
            <Menu menus={menus} mode="horizontal" theme={theme.headerTheme} />
          )}
          {hasBreadcrumb && device != "mobile" && <Breadcrumb menus={menus} />}
        </div>

        {theme.headerActionPosition === "header" && (
          <HeaderActions theme={theme} device={device} />
        )}
      </a-layout-header>
    );
  }
};
