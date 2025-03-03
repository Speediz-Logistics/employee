import { defineStore } from 'pinia';
import { ref } from 'vue';
import TrackingService from '@/services/TrackingService.js'; // Assuming it's inside the services folder


export const useTrackingStore = defineStore('tracking', () => {
  const data = ref([]);

  const all = async (params) => {
    const response = await TrackingService.index(params); // Assuming you have an index method in your service
    data.value = response.data;
    return response;
  }

  const show = async (id) => {
    const response = await TrackingService.show(id);
    data.value = response.data;
    return response;
  };

  return {
    all,
    show
  };
});
