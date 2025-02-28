<script setup>

</script>

<template>
  <div>
    <h1 class="fw-bold">Vendor Invoice</h1>
    <div class="d-flex justify-content-between mt-2">
      <!--Search-->
      <div class="d-flex gap-3">
        <el-autocomplete
          v-model="state1"
          :fetch-suggestions="querySearch"
          clearable
          class="inline-input w-75"
          placeholder="Please enter vendor name..."
          @select="handleSelect"
        />
        <el-button type="warning" class="ml-2" @click="handleAdd">Search</el-button>
      </div>
      <div>
        <el-date-picker
          v-model="value1"
          type="week"
          format="[day] ww"
          placeholder="Pick a date"
        />
      </div>
    </div>
    <div>
      <el-table :data="tableData" class="vendor-table">
        <el-table-column prop="date" label="ID Invoice" width="180" />
        <el-table-column prop="name" label="Date" width="180" />
        <el-table-column prop="date" label="Vendor name" width="380" />
        <el-table-column prop="name" label="Count" width="180" />
        <el-table-column prop="date" label="Total Invoice" width="180" />
        <el-table-column prop="date" label="Status" width="180" />
        <el-table-column prop="name" label="Action"/>
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
