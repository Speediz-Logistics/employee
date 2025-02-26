<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Reactive chart data
const chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Delivery',
      data: [40, 20, 12,10,20,40,50],
      backgroundColor: 'rgba(75, 192, 192, 0.5)', // Add background color
      borderColor: 'rgba(75, 192, 192, 1)', // Add border color
      borderWidth: 1
    }
  ]
})

// Chart options
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    }
  }
})
</script>
