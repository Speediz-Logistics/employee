import { defineStore } from 'pinia';
import { ref } from 'vue';
import SettingService from '@/services/SettingService.js';

export const useSettingStore = defineStore('setting', () => {
  const data = ref([]);

  const all = async (params) => {
    const response = await SettingService.index(params); // Assuming you have an index method in your service
    data.value = response.data?.data || [];
    return response;
  };

  //edit delivery
  const edit = async (params) => {
    try {
      const response = await SettingService.store(params);
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  return {
    all,
    edit,
  };
});
