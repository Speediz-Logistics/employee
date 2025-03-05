import vendorService from "@/services/VendorService.js";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useVendorStore = defineStore("vendors", () => {
  const data = ref([]);
  const total = ref(0);
  const currentPage = ref(1);

  const all = async (params) => {
    const response = await vendorService.index(params);
    data.value = response?.data?.data || [];
    total.value = response?.data?.paginate?.total || 0;
    currentPage.value = response?.data?.paginate?.current_page || 1;
    return response;
  };

  const setTotal = (totalValue) => {
    total.value = totalValue;
  };

  const setCurrentPage = (page) => {
    currentPage.value = page;
  };

  //delete vendor
  const deleteVendor = async (id) => {
    try{
      const response = await vendorService.destroy(id);
      return response.data;
    }catch (e) {
      console.log(e);
      throw e;
    }
  };
  //create vendor
  const createVendor = async (params) => {
    try{
      const response = await vendorService.store(params);
      return response.data;
    }catch (e) {
      console.log(e);
      throw e;
    }
  };
  //edit vendor
  const editVendor = async (id, params) => {
    try{
      const response = await vendorService.update(id, params);
      return response.data;
    }catch (e) {
      console.log(e);
      throw e;
    }
  };
  //show vendor
  const showVendor = async (id) => {
    try{
      const response = await vendorService.show(id);
      return response.data;
    }catch (e) {
      console.log(e);
      throw e;
    }
  };
  return {
    all,
    data,
    total,
    currentPage,
    setTotal,
    setCurrentPage,
    vendors: computed(() => data),
    deleteVendor,
    createVendor,
    editVendor,
    showVendor
  }
});
