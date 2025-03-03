<script setup>
import { ref, defineProps, onMounted, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Accept props from the parent component
const props = defineProps({
  data: Object, // Data passed from the parent component
})

// Compute chartData from props
const chartData = computed(() => ({
  labels: props.data?.labels || [], // Set labels
  datasets: [
    {
      label: "Packages",
      data: props.data?.data || [], // Set data
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    }
  ]
}));

</script>

<template>
  <Bar
    id="my-chart-id"
    :data="chartData"
  />
</template>
