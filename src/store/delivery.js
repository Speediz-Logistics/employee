import { defineStore } from 'pinia';
import { ref } from 'vue';
import DeliveryService from "@/services/DeliveryService.js";


export const useDeliveryStore = defineStore('drivers', () => {
  const data = ref([]);

  const all = async (params) => {
    const response = await DeliveryService.index(params); // Assuming you have an index method in your service
    data.value = response.data?.data || [];
    return response;
  }

  //delete delivery
    const deleteDelivery = async (id) => {
        try{
        const response = await DeliveryService.destroy(id);
        return response.data;
        }catch (e) {
        console.log(e);
        throw e;
        }
    };

  //show delivery
    const showDelivery = async (id) => {
        try{
        const response = await DeliveryService.show(id);
        return response.data;
        }catch (e) {
        console.log(e);
        throw e;
        }
    };

    //create delivery
    const createDelivery = async (params) => {
        try{
        const response = await DeliveryService.store(params);
        return response.data;
        }catch (e) {
        console.log(e);
        throw e;
        }
    };


    //edit delivery
    const editDelivery = async (id, params) => {
        try{
        const response = await DeliveryService.update(id, params);
        return response.data;
        }catch (e) {
        console.log(e);
        throw e;
        }
    };
  return {
    all,
    deleteDelivery,
    showDelivery,
    createDelivery,
    editDelivery
  };
});
