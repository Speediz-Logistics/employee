<script setup>
import {ref, onMounted} from 'vue';
import {useInvoicePackageStore} from "@/store/invoice-package";
import {useRouter, useRoute} from "vue-router";
const router = useRouter()
const route = useRoute()
const store = useInvoicePackageStore()

const form = reactive({
  sender_name: "",
  sender_phone_number: "",
  receiver_phone: "",
  branch: "",
  destination: "",
  package_name: "",
  package_type: "",
  package_price: "",
  package_price_riel: "",
  delivery_fee: "",
  delivery_contact: "",
  delivery_telegram: "",
  status: "",
  note: "",
})
const show = (id) => {
  store.showInvoicePackage(id).then((response) => {
    form.sender_name = response.personal?.sender_name
    form.sender_phone_number = response.personal?.sender_phone_number
    form.receiver_phone = response.personal?.receiver_phone
    form.branch = response.personal?.branch
    form.destination = response.personal?.destination
    form.package_name = response.package_info?.package_name
    form.package_type = response.package_info?.package_type
    form.package_price = response.package_info?.package_price
    form.package_price_riel = response.package_info?.package_price_riel
    form.delivery_fee = response.delivery_fee?.delivery_fee
    form.delivery_contact = response.delivery_fee?.delivery_contact
    form.delivery_telegram = response.delivery_fee?.delivery_telegram
    form.status = response.delivery_fee?.status
    form.note = response.delivery_fee?.note
  })
}
const handleBack = () => {
  router.go(-1)
}
onMounted(() => {
  const id = route.params?.id
  show(id)
})
</script>

<template>
  <div class="d-flex button-container">
    <button class="back" @click="handleBack">
      Back
    </button>
  </div>
  <div class="m-lg-5 fw-bold title">
    Invoice Detail
  </div>
  <div class="m-4">
    <div class="d-flex justify-content-center p-4  border header">
      <div>
        Sender/Reciever Info
      </div>
      <div>
        Package Info
      </div>
      <div>
        Delivery Info
      </div>
    </div>
    <div class="d-flex gap-4 p-4 border">
      <div class="w-50">
        <el-form :model="form" label-width="auto">
          <el-form-item label="Sender Name">
            <el-input v-model="form.sender_name" disabled/>
          </el-form-item>
          <el-form-item label="Sender phone">
            <el-input v-model="form.sender_phone_number" disabled/>
          </el-form-item>
          <el-form-item label="Receiver phone">
            <el-input v-model="form.receiver_phone"  disabled/>
          </el-form-item>
          <el-form-item label="Branch">
            <el-input v-model="form.branch" disabled/>
          </el-form-item>
          <el-form-item label="Destination">
            <el-input v-model="form.destination"  disabled/>
          </el-form-item>
        </el-form>
      </div>
      <div class="w-50">
        <el-form :model="form" label-width="auto">
          <el-form-item label="Customer name">
            <el-input v-model="form.package_name" disabled/>
          </el-form-item>
          <el-form-item label="Package Type">
            <el-input v-model="form.package_type" disabled/>
          </el-form-item>
          <el-form-item label="Package price($)">
            <el-input v-model="form.package_price"  disabled/>
          </el-form-item>
          <el-form-item label="Package price(Riel)">
            <el-input v-model="form.package_price_riel" disabled/>
          </el-form-item>
        </el-form>
      </div>
      <div class="w-50">
        <el-form :model="form" label-width="auto">
          <el-form-item label="Delivery Fee">
            <el-input v-model="form.delivery_fee" disabled/>
          </el-form-item>
          <el-form-item label="Delivery phone">
            <el-input v-model="form.delivery_contact" disabled/>
          </el-form-item>
          <el-form-item label="Delivery telegram contact">
            <el-input v-model="form.delivery_telegram"  disabled/>
          </el-form-item>
          <el-form-item label="Status">
            <el-input v-model="form.status" disabled/>
          </el-form-item>
          <el-form-item label="Note">
            <el-input v-model="form.note"  type="textarea" disabled/>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title{
  font-size: 32px;
}
.header{
  font-size: 24px;
  gap: 400px;
}
.back{
  background-color: #ffde59;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  font-size: 20px;
  height: 50px;
  margin: 10px;
}
.back:hover{
  background-color: #ffde59;
  color: white;
  opacity: 0.5;
}
</style>
