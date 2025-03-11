<script setup>
import {useInvoiceVendorStore} from "@/store/invoice-vendor.js";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useDebounce} from "@/composables/useDebounce.js";
const router = useRouter();
const tableData = ref([])
const searchQuery = ref('');
const total = ref(0);
const currentPage = ref(1);
const date = ref([]);
const store = useInvoiceVendorStore()
const {debounce} = useDebounce()
const fetchData = async () => {
  const params = {
    search: searchQuery.value || "",
    date: date.value || "",
    page: currentPage.value,
  };
  const response = await store.all(params)
  tableData.value = response.data?.data
  total.value = response?.data?.pagination?.total || 0;
  currentPage.value = response?.data?.pagination?.current_page || 1;
}
//handle page change
const handlePageChange = (page) => {
  currentPage.value = page
  fetchData()
}
//handle view
const handleView = (id) => {
  router.push({name: 'invoice-vendor', params: {id}})
}
//handle search
const handleSearch = debounce(async (query) => {
  searchQuery.value = query
  fetchData()
}, 300)
//handle date change
const handleDateChange = (selectDate) => {
  date.value = selectDate;
  fetchData();
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="m-4">
    <h1 class="fw-bold">Vendor Invoice</h1>
    <div class="d-flex justify-content-between mt-2">
      <!--Search-->
      <div class="d-flex gap-3">
        <el-input
          v-model="searchQuery"
          clearable
          class="inline-input w-75"
          placeholder="Please enter vendor name..."
          @input="handleSearch"
        />
      </div>
      <div>
        <el-date-picker
          v-model="date"
          type="datetime"
          format="YYYY-MM-DD"
          placeholder="Pick a date"
          @change="handleDateChange"
        />
      </div>
    </div>
    <div>
      <el-table :data="tableData" class="vendor-table">
        <el-table-column prop="id" label="ID Invoice" width="180" />
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="vendor_name" label="Vendor name" width="380" />
        <el-table-column prop="amount" label="Count" width="180" />
        <el-table-column prop="total_invoice" label="Total Invoice" width="180" />
        <el-table-column prop="payment_status" label="Payment status" width="180" />
        <el-table-column prop="name" label="Action">
          <template #default="scope">
            <el-button type="warning" @click="handleView(scope.row?.id)">View</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total=total @change="handlePageChange" />
    </div>
  </div>
</template>

<style scoped>
.vendor-table{
  font-size: 20px;
  margin-top: 20px;
  border: #FFDE59;
  border-radius: 10px;
}
h1{
  font-size: 30px;
}
</style>
