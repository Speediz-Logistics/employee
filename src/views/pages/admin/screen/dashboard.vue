<script setup>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import BarChart from '@/components/BarChart.vue';
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const chartData = {
  labels: labels,
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Prevents chart collapse
  plugins: {
    legend: {
      display: true,
      position: 'top'
    }
  }
};

</script>

<template>
  <div class="container py-4">
    <h1 class="fw-bold">Dashboard</h1>
    <div class="row g-3 pt-3">
      <div class="col-md-3">
        <div class="bg-light p-3 rounded shadow-sm">
          <p class="text-muted mb-1">Total Users</p>
          <p class="fs-5 fw-bold">40,689</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="bg-light p-3 rounded shadow-sm">

          <p class="text-muted mb-1">Total Orders</p>
          <p class="fs-5 fw-bold">100,000</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="bg-light p-3 rounded shadow-sm">
          <p class="text-muted mb-1">Total Sales</p>
          <p class="fs-5 fw-bold">$100,000</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="bg-light p-3 rounded shadow-sm">
          <p class="text-muted mb-1">Total Pending</p>
          <p class="fs-5 fw-bold">20,000</p>
        </div>
      </div>
    </div>

    <div class="d-flex flex-column gap-3">
      <div class="bar-chart bg-light shadow-sm mt-4">
        <h2>Total Delivery</h2>
        <BarChart />
      </div>
      <div>
        <el-table :data border class="table bg-light shadow-sm mt-4 rounded-4">
          <el-table-column prop="id" label="ID" width="50" />
          <el-table-column prop="vendor" label="Vendor Name" width="280" />
          <el-table-column prop="name" label="Location" width="180" />
          <el-table-column prop="name" label="Total Delivery" width="180" />
          <el-table-column prop="name" label="Amount"/>
        </el-table>
      </div>
    </div>
  </div>
</template>


<style scoped>

h1{
  color: #000000;
  font-size: 30px;
  font-weight: 700;
  padding-bottom: 10px;
}
.bar-chart{
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
  width: 800px;
  height: 400px;
}
.table{
  border-radius: 10px;
  font-size: 20px;
}
</style>
