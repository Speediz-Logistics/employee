import invoicePackageService from '@/services/InvoicePackageService.js';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useInvoicePackageStore = defineStore('invoicePackages', () => {
  const data = ref([]);
  const total = ref(0);
  const currentPage = ref(1);

  const all = async (params) => {
    const response = await invoicePackageService.index(params);
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
  //show invoicePackage
  const showInvoicePackage = async (id) => {
    try {
      const response = await invoicePackageService.show(id);
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  return {
    all,
    showInvoicePackage,
    setTotal,
    setCurrentPage,
  };
});
