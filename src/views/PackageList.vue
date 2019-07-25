<template>
  <div>
    <div class="header-bar">
      <h1 class="title">菜鸟驿站</h1>
      <div class="action-bar">
        <div>
          <a-radio-group @change="onFilterChange" v-model="currentFilter">
            <a-radio-button
              v-for="item in filters"
              :key="item.name"
              :value="item.filter"
            >{{item.name}}</a-radio-button>
          </a-radio-group>
        </div>
        <a-button type="primary" @click="modalVisible = true">添加</a-button>
      </div>
    </div>
    <div class="main-list">
      <a-table :columns="tableColumns" :rowKey="record => record.id" :dataSource="packageList">
        <template slot="status" slot-scope="status">{{packageStatus[status]}}</template>
        <template slot="actions" slot-scope="record">
          <a-button
            type="primary"
            v-if="record.status !== 'FINISHED'"
            @click="() => onConfirmReceipt(record)"
          >确认收货</a-button>
        </template>
      </a-table>
    </div>
    <PackageAddModal v-model="modalVisible" />
  </div>
</template>
<script>
import PackageAddModal from "../components/PackageAddModal";
import { filter } from "minimatch";

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
  {
    title: "状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" }
  },
  { title: "预约时间", dataIndex: "reserveTime" },
  { title: "操作", scopedSlots: { customRender: "actions" } }
];

const filters = [
  { name: "全部", filter: () => true, key: "ALL" },
  { name: "未预约", filter: item => item.status === "PENDING", key: "PENDING" },
  {
    name: "已预约",
    filter: item => item.status === "RESERVING",
    key: "RESERVING"
  },
  {
    name: "已取件",
    filter: item => item.status === "FINISHED",
    key: "FINISHED"
  }
];

const packageStatus = {
  PENDING: "未预约",
  RESERVING: "已预约",
  FINISHED: "已取件"
};

export default {
  name: "PackageList",
  components: {
    PackageAddModal
  },
  data() {
    return {
      tableColumns,
      modalVisible: false,
      filters,
      currentFilter: filters[0].filter,
      packageStatus
    };
  },
  computed: {
    packageList() {
      return this.$store.getters.packageList.filter(this.currentFilter);
    }
  },
  mounted() {
    this.$store.dispatch("fetchPackageList");
  },
  methods: {
    onConfirmReceipt(record) {
      this.$store.dispatch("confimReceipt", record);
    },
    onFilterChange(e) {
      this.currentFilter = e.target.value;
    }
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
  .action-bar {
    display: flex;
  }
}
</style>


