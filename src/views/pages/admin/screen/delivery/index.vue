<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

const handleNavigate = () => {
  router.push({name: 'delivery-create'})
}

</script>

<template>
  <div>
    <h1 class="fw-bold">Delivery</h1>
    <div class="d-flex justify-content-between mt-2">
      <!--Search-->
      <div class="d-flex gap-3">
        <el-autocomplete
          v-model="state1"
          :fetch-suggestions="querySearch"
          clearable
          class="inline-input w-100"
          placeholder="Please enter vendor name..."
          @select="handleSelect"
        />
        <el-button type="warning" class="ml-2" @click="handleSearch">Search</el-button>
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
        <el-table-column prop="date" label="ID Delivery" width="180" />
        <el-table-column prop="name" label="Delivery Name" width="380" />
        <el-table-column prop="date" label="location" width="180" />
        <el-table-column prop="name" label="Contact" width="180" />
        <el-table-column prop="date" label="Status" width="180" />
        <el-table-column prop="name"/>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="50" />
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
