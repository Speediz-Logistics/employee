<script setup>
import { ref, onMounted } from "vue";
import { useVendorStore } from "@/store/vendor.js";
import { useDebounce } from "@/composables/useDebounce";
import { useRouter } from "vue-router";
import {ElMessage} from "element-plus";

const vendorStore = useVendorStore();
const router = useRouter();
const { all, deleteVendor } = vendorStore;
const {debounce} = useDebounce();
const searchQuery = ref("");
const tableData = ref([]);
const total = ref(0);
const currentPage = ref(1);
const fetchData = async () => {
  const params = {
    search: searchQuery.value || "",
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
}, 200);

onMounted(() => {
  fetchData();
});

const handleNavigate = () => {
  router.push({name: 'vendor-create'})
}
const handleEdit = (id) => {
  router.push({name: 'vendor-edit', params: {id}});
}
const handleDelete = async (id) => {
  console.log("Delete vendor with ID:", id);
  ElMessageBox.confirm("Are you sure you want to delete this vendor?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      try {
        await deleteVendor(id);
        fetchData(); // Refresh vendor list after deletion
        ElMessage.success("Vendor deleted successfully");
      } catch {
        ElMessage.error("Failed to delete vendor");
      }
    })
    .catch(() => {
      ElMessage.info("Delete canceled");
    });
};

</script>
<template>
  <div class="p-4">
    <h1 class="fw-bold">Vendor</h1>
    <div class="d-flex justify-content-between mt-2">
      <!--Search-->
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
        <el-button type="primary" class="ml-2" @click="handleNavigate">
          <font-awesome-icon :icon="['fas', 'plus']" />&nbsp;&nbsp;
          Create Account
        </el-button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" class="vendor-table">
        <el-table-column prop="id" label="ID Vendor" width="180" />
        <el-table-column prop="business_name" label="Vendor Name" width="380" />
        <el-table-column prop="address" label="Address" width="180" />
        <el-table-column prop="gender" label="Gender" width="180" />
        <el-table-column prop="contact_number" label="Contact" width="180" />
        <el-table-column prop="status" label="Status" width="180" />
        <el-table-column
        >
          <template #default="scope">
            <el-button @click="handleEdit(scope.row.id)">
              <font-awesome-icon :icon="['fas', 'edit']" />
            </el-button>
            <el-button @click="handleDelete(scope.row.id)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--handlePageChange-->
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
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
