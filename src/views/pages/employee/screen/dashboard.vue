<script setup>
import BarChart from '@/components/BarChart.vue';
import { useDashboardStore } from '@/store/dashboard.js';
import { ref, onMounted } from 'vue';
const data = ref({});
const dashboardStore = useDashboardStore();
const { all } = dashboardStore;
const fetchDate = async () => {
  data.value = (await all()) || {};
};
onMounted(() => {
  fetchDate();
});
</script>

<template>
  <div class="m-4">
    <div class="container py-4">
      <h1 class="fw-bold">Dashboard</h1>

      <div class="row g-3 pt-3">
        <div class="col-md-3">
          <div class="bg-light p-3 rounded shadow-sm">
            <p class="text-muted mb-1">Total Users</p>
            <p class="fs-5 fw-bold">{{ data?.data?.total_users }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="bg-light p-3 rounded shadow-sm">
            <p class="text-muted mb-1">Total Packages</p>
            <p class="fs-5 fw-bold">{{ data?.data?.total_packages }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="bg-light p-3 rounded shadow-sm">
            <p class="text-muted mb-1">Total Vendor</p>
            <p class="fs-5 fw-bold">{{ data?.data?.total_vendors }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="bg-light p-3 rounded shadow-sm">
            <p class="text-muted mb-1">Total Sale</p>
            <p class="fs-5 fw-bold">{{ data?.data?.total_sales }}</p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6 bar-chart bg-light shadow-sm mt-4">
          <h2>Total Packages</h2>
          <BarChart :data="data.data?.package_per_month" />
        </div>

        <div class="col-6 mt-4">
          <div class="mb-2">Vendor List</div>
          <el-table :data="data?.data?.recent_vendors" border class="table rounded-4">
            <el-table-column prop="vendor_id" label="Vendor ID" />
            <el-table-column prop="vendor_name" label="Vendor Name" />
            <el-table-column prop="vendor_address" label="Address" />
            <el-table-column prop="total_delivery" label="Total Package" />
            <el-table-column prop="amount" label="Amount" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #000000;
  font-size: 30px;
  font-weight: 700;
  padding-bottom: 10px;
}
.bar-chart {
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
}
.table {
  border-radius: 10px;
}
</style>
