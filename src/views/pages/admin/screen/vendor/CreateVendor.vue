<script setup>
import { reactive } from 'vue'
import {useRouter} from "vue-router";
import{useVendorStore} from "@/store/vendor.js";
import dayjs from "dayjs"; //import dayjs for date formatting

const {createVendor} = useVendorStore()
const router = useRouter()
const navigateBack = () => {
  router.go(-1)
}
// do not use same name with ref
const form = reactive({
 first_name: '',
  last_name: '',
  business_name: '',
  gender: '',
  dob: '',
  contact_number: '',
  address: '',
  email: '',
  password: ''

})
const onSubmit = async () => {
  try {
    if (form.dob) {
      form.dob = dayjs(form.dob).format("YYYY-MM-DD"); // Convert to YYYY-MM-DD
    }
    await createVendor(form)
    router.go(-1)
  } catch (e) {
    console.error("Error creating vendor:", e)
  }
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
      <el-input v-model="form.first_name" placeholder="Enter your firstname"/>
    </el-form-item>
    <el-form-item label="Lastname">
      <el-input v-model="form.last_name" placeholder="Enter your lastname"/>
    </el-form-item>
    <el-form-item label="Business name">
      <el-input v-model="form.business_name" placeholder="Enter your Business name"/>
    </el-form-item>
    <el-form-item label="Gender">
      <el-select v-model="form.gender" placeholder="please select your gender">
        <el-option label="Female" value="female" />
        <el-option label="Male" value="male" />
        <el-option label="Prefer not to say" value="prefer not to say" />
      </el-select>
    </el-form-item>
    <el-form-item label="Date of Birth">
        <el-date-picker
          v-model="form.dob"
          type="date"
          format="YYYY-MM-DD"
          placeholder="Pick a date"
        />
    </el-form-item>
    <el-form-item label="Contact">
      <el-input v-model="form.contact_number" placeholder="Enter your phone number"/>
    </el-form-item>
    <el-form-item label="Location">
      <el-input v-model="form.address" placeholder="Sangkat, Phnom Penh"/>
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="form.email" placeholder="example@gmail.com"/>
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="form.password" placeholder="Enter Password"/>
    </el-form-item>
    <el-form-item class="gap-3">
      <el-button type="primary" @click="onSubmit">Create</el-button>
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
