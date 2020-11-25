export default {
  data() {
    return {};
  },
  methods: {
    onSearch(val) {
      this.$emit("search", val);
    }
  },
  render() {
    const { onSearch } = this;
    return (
      <div class="menu-search-input">
        <a-input-search
          placeholder="菜单搜索"
          allowClear
          {...{ on: { search: onSearch } }}
        />
      </div>
    );
  }
};
