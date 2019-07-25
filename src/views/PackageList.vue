<template>
  <div>
    <div class="header-bar">
      <h1>菜鸟驿站</h1>
    </div>
    <div class="main-list">
      <a-table :columns="tableColumns" :rowKey="record => record.id" :dataSource="packageList"></a-table>
    </div>
  </div>
</template>
<script>
const tableColumns = [
  { title: "运单号", dataIndex: "no" },
  {
    title: "收件人",
    dataIndex: "customerName"
  },
  {
    title: "电话",
    dataIndex: "phone"
  },
  { title: "状态", dataIndex: "status" },
  { title: "预约时间", dataIndex: "reserveTime" },
  { title: "操作" }
];

export default {
  name: "PackageList",
  data() {
    return {
      tableColumns
    };
  },
  computed: {
    packageList() {
      return this.$store.getters.packageList;
    }
  },
  mounted() {
    this.$store.dispatch("fetchPackageList");
  }
};
</script>

