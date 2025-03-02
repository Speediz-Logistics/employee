<script setup>
import { reactive } from 'vue'
import {useRouter} from "vue-router";
const router = useRouter()
const navigateBack = () => {
  router.go(-1)
}
// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<template>
<div class="form">
  <el-button type="warning" plain @click="navigateBack">
    <font-awesome-icon :icon="['fas', 'arrow-left']" />
    Back
  </el-button>
  <h1>Create Vendor</h1>
  <el-form  :model="form" label-width="auto">
    <el-form-item label="Firstname" >
      <el-input v-model="form.name" placeholder="Enter your firstname"/>
    </el-form-item>
    <el-form-item label="Lastname">
      <el-input v-model="form.name" placeholder="Enter your lastname"/>
    </el-form-item>
    <el-form-item label="Business name">
      <el-input v-model="form.name" placeholder="Enter your Business name"/>
    </el-form-item>
    <el-form-item label="Gender">
      <el-select v-model="form.region" placeholder="please select your gender">
        <el-option label="Female" value="shanghai" />
        <el-option label="Male" value="beijing" />
        <el-option label="Prefer not to say" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Date of Birth">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="Pick a date"
        />
    </el-form-item>
    <el-form-item label="Contact">
      <el-input v-model="form.name" placeholder="Enter your phone number"/>
    </el-form-item>
    <el-form-item label="Location">
      <el-input v-model="form.name" placeholder="Sangkat, Phnom Penh"/>
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="form.name" placeholder="example@gmail.com"/>
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="form.name" placeholder="Enter Password"/>
    </el-form-item>
    <el-form-item class="gap-3">
      <el-button type="primary">Create</el-button>
    </el-form-item>

  </el-form>
</div>
</template>

<style scoped>
h1{
  font-size: 30px;
  justify-content: center;
  justify-items: center;
  text-align: center;
  margin-bottom: 10px;
}
.form{
  width: 800px;
  height: 800px;
  box-shadow: #888888 1px 1px 10px;
  padding: 10px;
  border-radius: 20px;
}
.el-content{
  font-size: 20px;
}
</style>
