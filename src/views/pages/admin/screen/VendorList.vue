<script setup>
import { ref, onMounted } from "vue";
import { useVendorStore } from "@/store/vendor.js";
import { useDebounce } from "@/composables/useDebounce";
import { useRouter } from "vue-router";

const vendorStore = useVendorStore();
const router = useRouter();
const { all } = vendorStore;
const {debounce} = useDebounce();
const searchQuery = ref("");
const date = ref([]);
const tableData = ref([]);
const total = ref(0);
const currentPage = ref(1);
const fetchData = async () => {
  const params = {
    search: searchQuery.value || "",
    date: date.value || "",
    page: currentPage.value,
    per_page: 10,
  };
  try {
    const response = await all(params);
    tableData.value = response.data?.data; // Ensure correct data structure
    total.value = response?.data?.paginate?.total;
    currentPage.value = response?.data?.paginate?.current_page;
  } catch (e) {
    console.error("Error fetching vendor data:", e);
  }
};
const handlePageChange = (page) => {
  currentPage.value = page; // Update the local ref
  fetchData();
};
const handleSearch = debounce(async (query) => {
  searchQuery.value = query;
  await fetchData();
}, 300);

//handle date change
const handleDateChange = (selectDate) => {
  date.value = selectDate;
  fetchData();
}
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="p-4">
    <h1 class="fw-bold">Vendor List</h1>
    <div class="d-flex justify-content-between mt-2 ">
      <!-- Search -->
      <div class="d-flex gap-3">
        <el-input
          v-model="searchQuery"
          clearable
          class="inline-input w-100"
          placeholder="Please enter vendor name..."
          @input="handleSearch"
        />
      </div>
      <div>
        <el-date-picker
          v-model="date"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          placeholder="Pick a date"
        @change="handleDateChange"
        />
      </div>
    </div>
    <div v-if="tableData" class="table">
      <el-table :data="tableData" class="vendor-table">
        <el-table-column prop="id" label="ID" width="50" />
        <el-table-column prop="business_name" label="Vendor Name" width="180" />
        <el-table-column prop="business_type" label="Business Type" width="180" />
        <el-table-column prop="business_description" label="Business Description" width="300" />
        <el-table-column prop="contact_number" label="Phone" width="150" />
        <el-table-column prop="address" label="Address" width="250" />
        <el-table-column prop="created_at" label="Date Joined" width="180" />
        <el-table-column prop="status" label="Status" width="300" />
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="handlePageChange"
      />
    </div>
    <div v-else>
      <p>No data available.</p>
    </div>
  </div>
</template>

<style scoped>
.vendor-table {
  font-size: 20px;
  margin-top: 20px;
  border: 1px solid #ffde59;
  border-radius: 10px;
}
.table{
  max-width: 1600px;

}
h1 {
  font-size: 30px;
}
</style>
