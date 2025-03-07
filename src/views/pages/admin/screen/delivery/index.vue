<script setup>
import {useRouter} from "vue-router";
import {useDeliveryStore} from "@/store/delivery.js";
import { onMounted, ref } from 'vue';
import {ElMessage} from "element-plus";
import { useDebounce } from "@/composables/useDebounce";
const deliveryStore = useDeliveryStore()
const {all, deleteDelivery} = deliveryStore
const data = ref([])
const total = ref(0)
const current_page = ref(1)
const querySearch = ref('')
const {debounce} = useDebounce()

const router = useRouter()

const fetchData = async () => {
  const params = {
    search: querySearch.value || '',
    page: current_page.value || 1,
  }
  try{
    const response = await all(params)
    data.value = response.data?.data || []
    total.value = response.data?.paginate?.total || 0
    current_page.value = response.data?.paginate?.current_page || 1
  }catch (e){
    ElMessage.error('FetchData Failed', e.message)
  }
}
//handle edit
const handleEdit = (id) => {
  router.push({name: 'delivery-edit', params: {id}})
}
//handle delete
const handleDelete = async (id) => {
  ElMessageBox.confirm("Are you sure you want to delete this vendor?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      try {
        await deleteDelivery(id);
        fetchData(); // Refresh vendor list after deletion
        ElMessage.success("Delivery deleted successfully");
      } catch {
        ElMessage.error("Failed to delete Delivery");
      }
    })
    .catch(() => {
      ElMessage.info("Delete canceled");
    });
};
const handlePageChange = (page) => {
  current_page.value = page
  fetchData()
}
const handleSearch = debounce(async (query) => {
  querySearch.value = query
  fetchData()
}, 300)

onMounted(() => {
  fetchData()
})
const handleNavigate = () => {
  router.push({name: 'delivery-create'})
}

</script>

<template>
  <div class="p-4">
    <h1 class="fw-bold">Delivery</h1>
    <div class="d-flex justify-content-between mt-2">
      <!--Search-->
      <div class="d-flex gap-3">
        <el-input
          v-model="querySearch"
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
      <el-table :data="data" class="vendor-table">
        <el-table-column prop="id" label="ID Delivery" width="180" />
        <el-table-column prop="first_name" label="Delivery Name" width="380" />
        <el-table-column prop="gender" label="Gender" width="180" />
        <el-table-column prop="contact_number" label="Contact" width="180" />
        <el-table-column prop="address" label="location" width="380" />
        <el-table-column prop="status" label="Status" width="180" >
          <template #default="scope">
            <span v-if="scope.row.status === 1 " type="success">Active</span>
            <span v-else type="danger">Inactive</span>
          </template>
        </el-table-column>
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
      <el-pagination
        layout="prev, pager, next" :total=total
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
