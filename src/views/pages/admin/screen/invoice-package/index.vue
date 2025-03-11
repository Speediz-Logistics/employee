<script setup>
import {useRouter} from "vue-router";
import {useInvoicePackageStore} from "@/store/invoice-package.js";
import { onMounted, ref } from 'vue';
import { useDebounce } from "@/composables/useDebounce";
const store = useInvoicePackageStore()
const {all} = store
const dataForm = ref([])
const date = ref([])
const total = ref(0)
const currentPage = ref(1)
const searchQuery = ref('')
const {debounce} = useDebounce()

const router = useRouter()

const fetchData = async () => {
  const params = {
    search: searchQuery.value || "",
    date: date.value || "",
    page: currentPage.value,
    per_page: 10,
  };
  try {
    const response = await all(params);
    dataForm.value = response.data?.data; // Ensure correct data structure
    total.value = response?.data?.pagination?.total;
    currentPage.value = response?.data?.pagination?.current_page;
  } catch (e) {
    console.error("Error fetching vendor data:", e);
  }
};
//handle edit
const handleView = (id) => {
  router.push({name: 'invoice-package', params: {id}})
}
const handleSearch = debounce(async (query) => {
  searchQuery.value = query
  fetchData()
}, 300)
const handlePageChange = (page) => {
  currentPage.value = page
  fetchData()
}
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
  <div class="p-4">
    <h1 class="fw-bold">Package Invoice</h1>
    <div class="d-flex justify-content-between mt-2">
      <!--Search-->
      <div class="d-flex gap-3">
        <el-input
          v-model="searchQuery"
          clearable
          class="inline-input w-100"
          placeholder="Please enter customer phone..."
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
      <el-table :data="dataForm" class="vendor-table">
        <el-table-column prop="id" label="ID Package" width="180" />
        <el-table-column prop="customer_phone" label="Customer Phone" width="380" />
        <el-table-column prop="location" label="location" width="180" />
        <el-table-column prop="package_date" label="Package Date" width="180" />
        <el-table-column prop="package_price" label="Package price" width="180" />
        <el-table-column prop="package_status" label="Status"/>
        <el-table-column label="Action">
          <template #default="scope">
            <el-button type="primary" @click="handleView(scope.row.id)">Detail</el-button>
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
