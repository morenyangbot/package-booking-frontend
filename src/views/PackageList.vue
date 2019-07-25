<template>
  <div>
    <div class="header-bar">
      <h1 class="title">菜鸟驿站</h1>
      <div class="acton-bar">
        <a-button type="primary" @click="modalVisible = true">添加</a-button>
      </div>
    </div>
    <div class="main-list">
      <a-table :columns="tableColumns" :rowKey="record => record.id" :dataSource="packageList"></a-table>
    </div>
    <PackageAddModal v-model="modalVisible"/>
  </div>
</template>
<script>
import PackageAddModal from "../components/PackageAddModal";

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
  components: {
    PackageAddModal
  },
  data() {
    return {
      tableColumns,
      modalVisible: false
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

<style lang="scss" scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    flex: 1;
  }
}
</style>


