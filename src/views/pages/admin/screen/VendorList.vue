<script setup>
import { ref, onMounted } from "vue";
import { useVendorStore } from "@/store/vendor.js";
import { useDebounce } from "@/composables/useDebounce";
import { useRouter } from "vue-router";

const vendorStore = useVendorStore();
const router = useRouter();
const { all } = vendorStore;
const { debounce } = useDebounce();
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

// Handle date change
const handleDateChange = (selectDate) => {
  date.value = selectDate;
  fetchData();
};
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="container">
    <h1 class="title">Vendor List</h1>

    <div class="filters">
      <!-- Search -->
      <el-input
        v-model="searchQuery"
        clearable
        class="search-input"
        placeholder="Search vendor name..."
        @input="handleSearch"
        prefix-icon="el-icon-search"
      />

      <!-- Date Picker -->
      <el-date-picker
        v-model="date"
        type="date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        placeholder="Pick a date"
        class="date-picker"
        @change="handleDateChange"
      />
    </div>

    <el-table v-if="tableData.length" :data="tableData" class="vendor-table" stripe>
      <el-table-column prop="id" label="ID" width="70" align="center" />
      <el-table-column prop="business_name" label="Vendor Name" min-width="180" />
      <el-table-column prop="business_type" label="Business Type" min-width="180" />
      <el-table-column prop="business_description" label="Description" min-width="250" />
      <el-table-column prop="contact_number" label="Phone" min-width="150" />
      <el-table-column prop="address" label="Address" min-width="250" />
      <el-table-column prop="created_at" label="Date Joined" min-width="180" align="center" />
      <el-table-column prop="status" label="Status" width="120" align="center">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'">
            {{ row.status ? 'Active' : 'Inactive' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-empty v-else description="No vendor data available." />

    <!-- Pagination -->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      class="pagination"
      @current-change="handlePageChange"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 1600px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  gap: 10px;
}

.search-input {
  flex: 1;
  max-width: 400px;
}

.date-picker {
  min-width: 200px;
}

.vendor-table {
  font-size: 16px;
  border-radius: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
