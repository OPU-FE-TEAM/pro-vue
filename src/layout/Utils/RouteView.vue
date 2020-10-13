<script>
import { mapState } from "vuex"; 
export default {
  name: "RouteView",
  data() {
    return {env};
  },
  computed: {
    ...mapState({
      keepAliveComponents: state => state.app.keepAliveComponents
    })
  },
  render() {
    const {
      $route: { meta }
    } = this;
    // const includeArr = [" ", "AddBill"];

    const inKeep = (
      <keep-alive include={this.keepAliveComponents}>
        <router-view />
      </keep-alive>
    );
    const notKeep = <router-view />;

    return env.THEME.multiTab ? inKeep : notKeep;
  }
};
</script>
