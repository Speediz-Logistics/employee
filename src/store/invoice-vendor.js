import invoiceVendorService from "@/services/InvoiceVendorService.js";
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useInvoiceVendorStore = defineStore("invoiceVendors", () => {
    const data = ref([]);
    const total = ref(0);
    const currentPage = ref(1);

    const all = async (params) => {
      const response = await invoiceVendorService.index(params);
      data.value = response?.data?.data || [];
      total.value = response?.data?.pagination?.total || 0;
      currentPage.value = response?.data?.pagination?.current_page || 1;
      return response;
    };

    const setTotal = (totalValue) => {
      total.value = totalValue;
    };

    const setCurrentPage = (page) => {
      currentPage.value = page;
    };
    //show invoiceVendor
    const show = async (id) => {
      try{
        const response = await invoiceVendorService.show(id);
        return response;
      }catch (e) {
        console.log(e);
        throw e;
      }
    };
    return {
      all,
      show,
      setTotal,
      setCurrentPage,
    };
  }
);
