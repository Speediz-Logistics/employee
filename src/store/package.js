import packageService from '@/services/PackageService.js';
import packageSearchService from '@/services/PackageSearchService.js';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePackageStore = defineStore('package', () => {
  const data = ref([]);
  const total = ref(0);
  const currentPage = ref(1);

  const all = async (params) => {
    const response = await packageService.index(params);
    data.value = response?.data?.data || [];
    total.value = response?.data?.paginate?.total || 0;
    currentPage.value = response?.data?.paginate?.current_page || 1;
    return response;
  };

  const show = async (id) => {
    return await packageService.show(id);
  };

  const searchVendor = async (params) => {
    const query = {
      value: params,
      key: 'vendor',
    };
    const response = await packageSearchService.store(query);
    data.value = response?.data?.data || [];
    return response;
  };

  const searchCustomer = async (params) => {
    const query = {
      value: params,
      key: 'customer',
    };
    const response = await packageSearchService.store(query);
    data.value = response?.data?.data || [];
    return response;
  };

  const searchBranch = async (params) => {
    const query = {
      value: params,
      key: 'branch',
    };
    const response = await packageSearchService.store(query);
    data.value = response?.data?.data || [];
    return response;
  };

  const searchDriver = async (params) => {
    const query = {
      value: params,
      key: 'driver',
    };
    const response = await packageSearchService.store(query);
    data.value = response?.data?.data || [];
    return response;
  };

  const searchCurrency = async (params) => {
    const query = {
      value: params,
      key: 'currency',
    };
    const response = await packageSearchService.store(query);
    data.value = response?.data?.data || [];
    return response;
  };

  //searchPackageType
  const searchPackageType = async (params) => {
    const query = {
      value: params,
      key: 'package_type',
    };
    const response = await packageSearchService.store(query);
    data.value = response?.data?.data || [];
    return response;
  };

  //update
  const update = async (id, data) => {
    return await packageService.update(id, data);
  };

  //store
  const store = async (data) => {
    return await packageService.store(data);
  };

  return {
    all,
    show,
    searchVendor,
    searchCustomer,
    searchBranch,
    searchDriver,
    searchCurrency,
    update,
    store,
    searchPackageType,
  };
});
