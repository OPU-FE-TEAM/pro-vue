<script>
import { mapState } from "vuex";
export default {
  name: "RouteView",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      keepAliveComponents: state => state.app.keepAliveComponents
    })
  },
  render() {
    const inKeep = (
      <keep-alive include={this.keepAliveComponents}>
        <router-view />
      </keep-alive>
    );
    const notKeep = <router-view />;

    // eslint-disable-next-line no-undef
    return env.THEME.multiTab ? inKeep : notKeep;
  }
};
</script>
