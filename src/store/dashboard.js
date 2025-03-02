import { defineStore } from 'pinia';
import { ref } from 'vue';
import DashboardService from '@/services/DashboardService.js'; // Assuming it's inside the services folder


export const useDashboardStore = defineStore('dashboard', () => {
  const data = ref([]);

  const all = async (params) => {
    const response = await DashboardService.index(params); // Assuming you have an index method in your service
    data.value = response.data;
    return response;
  }
  return {
    all,
  };
});
