<script setup>
import {ref, onMounted} from "vue";
import {useInvoiceVendorStore} from "@/store/invoice-vendor";
import {useRouter, useRoute} from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useInvoiceVendorStore()
const {show} = store
const tableData = ref([])
const invoiceInfo = reactive({
  invoice_number: "",
  to: "",
  phone: "",
  date: "",
  total: "",
  completed: "",
  pending: "",
  cancelled: "",
  invoice_status: ""
})
const showInvoice = async (id) => {
  const response = await show(id)
  tableData.value = response.data?.invoices || [];
  invoiceInfo.invoice_number = response.data?.invoice_number || "";
  invoiceInfo.to = response.data?.to || "";
  invoiceInfo.phone = response.data?.phone || "";
  invoiceInfo.invoice_status = response.data?.invoice_status || "";
  invoiceInfo.date = response.data?.date || "";
  invoiceInfo.total = response.data?.package_status?.total || 0;
  invoiceInfo.completed = response.data?.package_status?.completed || 0;
  invoiceInfo.pending = response.data?.package_status?.pending || 0;
  invoiceInfo.cancelled = response.data?.package_status?.cancelled || 0;
  invoiceInfo.onHold = response.data?.package_status?.onHold || 0;
  console.log("response", )
}
const navigateBack = () => {
  router.go(-1)
}
onMounted(() => {
  const id = route.params?.id
  showInvoice(id)
})
</script>

<template>
<div class="p-4 ">
  <div>
    <el-button type="warning" @click="navigateBack" class="back">Back</el-button>
  </div>
  <h1 class="mt-2 fw-bold">Invoice</h1>
  <div class="rounded-4 p-4 shadow-lg ">
    <h1 class="d-flex justify-content-center align-content-center">Invoice</h1>
    <div class="container d-flex justify-content-lg-start gap-3">
      <ul>
        <li>Invoice No: </li>
        <li>To: </li>
        <li>Phone:</li>
        <li>Date: </li>
        <li>Status:</li>
        <li>Package:</li>
      </ul>
      <ul class="text-black-50 ">
        <li>
          {{ invoiceInfo.invoice_number }}
        </li>
        <li>
          {{ invoiceInfo.to }}
        </li>
        <li>
          {{ invoiceInfo.phone }}
        </li>
        <li>
          {{ invoiceInfo.date }}
        </li>
        <li>
          {{ invoiceInfo.invoice_status }}
        </li>
        <li>
          {{ invoiceInfo.total }}
        </li>
      </ul>
    </div>
    <div class="container">
      <div>
        <span>Success: {{ invoiceInfo.completed }} &nbsp</span>
        <span>Pending: {{ invoiceInfo.pending }}&nbsp</span>
        <span>Cancelled: {{ invoiceInfo.cancelled }}&nbsp</span>
      </div>
    </div>
    <div  class="table" v-if="tableData">
      <el-table :data="tableData" class="container  border rounded-4" >
        <el-table-column prop="id" label="ID package" width="180" />
        <el-table-column prop="shipment_code" label="Shipment code" width="180" />
        <el-table-column prop="receiver_contact" label="Receiver contact" width="180" />
        <el-table-column prop="package_date" label="Date" width="180" />
        <el-table-column prop="cod" label="COD" width="150" />
        <el-table-column prop="package_price" label="Package Price" width="180" />
        <el-table-column prop="delivery_fee" label="Delivery Fee" width="180" />
        <el-table-column prop="package_status" label="Status">
          <template #default="scope">
            <el-tag v-if="scope.row.package_status === 'success'" type="success">Success</el-tag>
            <el-tag v-else-if="scope.row.package_status === 'pending'" type="warning">Pending</el-tag>
            <el-tag v-else-if="scope.row.package_status === 'cancelled'" type="danger">Cancelled</el-tag>
            <el-tag v-else-if="scope.row.package_status === 'on-hold'" type="info">On-hold</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total=total @change="handlePageChange" />
    </div>
    <div v-else>
      <p>No data</p>
    </div>
  </div>
</div>
</template>

<style scoped>
h1{
  font-size: 30px;
  margin-bottom: 10px;
}
.container{
  font-size: 20px;
}
.table{
  margin-top: 20px;
  border: #FFDE59;
  border-radius: 10px;
  max-width: 1550px;
}
</style>
