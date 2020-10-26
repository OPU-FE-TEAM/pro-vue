<template>
  <div>
    <page-content>
      <data-table
        resizable
        show-overflow
        show-footer
        align="center"
        ref="dataTable"
        height="800"
        :loading="loading"
        :data="tableData"
        :columns="tableColumn"
        highlight-hover-row
        highlight-current-row
        :footer-method="footerMethod"
      >
        <template v-slot:sex="{ row }">
          <span v-if="row.sex == 1">男</span>
          <span v-if="row.sex == 2">女</span>
        </template>
      </data-table>
    </page-content>
  </div>
</template>

<script>
const data = Array.from({ length: 30 }, (_, key) => ({
  id: key,
  name: `name_${key}`,
  age: Math.ceil(Math.random() * 60),
  sex: Math.ceil(Math.random() * 2),
  price: Math.ceil(Math.random() * 10000) / 100
}));

export default {
  components: {},
  data() {
    return {
      loading: false,
      tableColumn: [
        { type: "checkbox", width: 60, align: "center" },
        { type: "seq", title: "Number", width: 100 },
        { field: "name", title: "Name", minWidth: 100 },
        { field: "age", title: "年龄", minWidth: 100 },
        {
          field: "sex",
          title: "Sex",
          minWidth: 100,
          slots: {
            default: "sex"
          }
        },
        { field: "price", title: "金额", minWidth: 100, align: "right" }
      ],
      tableData: data
    };
  },
  created() {},
  methods: {
    footerMethod({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "统计";
          }
          if (["age"].includes(column.property)) {
            let value = 0;
            data.map(p => (value += p.age));
            value = Math.ceil((value / data.length) * 100) / 100;
            return "平均年龄 " + value;
          }
          if (column.property == "sex") {
            let men = 0;
            let women = 0;
            data.map(p => {
              p.sex == 1 ? (men += 1) : (women += 1);
            });
            return (
              "男女比例 " +
              Math.round((men / women) * 100) / 100 +
              " (" +
              men +
              " / " +
              women +
              ")"
            );
          }
          if (column.property == "price") {
            let value = 0;
            data.map(p => (value += p.price));
            return value.toFixed(2);
          }
          return null;
        })
      ];
    }
  }
};
</script>

<style></style>
