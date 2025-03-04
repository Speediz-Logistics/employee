import vendorService from "@/services/VendorService.js";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useVendorStore = defineStore("vendors", () => {
  const data = ref([]);
  const total = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(10);

  const all = async (params) => {
    const response = await vendorService.index(params);
    data.value = response?.data?.data || [];
    total.value = response?.data?.total || 0;
    currentPage.value = response?.data?.current_page || 1;
    return response;
  };

  const setTotal = (totalValue) => {
    total.value = totalValue;
  };

  const setCurrentPage = (page) => {
    currentPage.value = page;
  };

  return {
    all,
    data,
    total,
    currentPage,
    setTotal,
    setCurrentPage,
    vendors: computed(() => data),
  }
});
