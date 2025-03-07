<script setup>
import {reactive, ref} from 'vue';
import {useRouter} from "vue-router";
import {useDeliveryStore} from "@/store/delivery.js";
import dayjs from "dayjs";

const deliveryStore = useDeliveryStore();
const {createDelivery} = deliveryStore;
const router = useRouter();

const navigateBack = () => {
  router.go(-1);
};

const form = reactive({
  first_name: '',
  last_name: '',
  cv: '',
  gender: '',
  dob: '',
  contact_number: '',
  address: '',
  email: '',
  password: '',
  telegram_contact: '',
  driver_type: '',
  driver_description: '',
  image: '',
});

const rule = {
  first_name: [{required: true, message: "Please input your first name", trigger: "blur"}],
  last_name: [{required: true, message: "Please input your last name", trigger: "blur"}],
  cv: [
    {required: true, message: "Please upload your CV", trigger: "change"},
    {type: "file", message: "Please upload a PDF file", trigger: "change"},
    {size: 1024, message: "File size should be less than 1MB", trigger: "change"}
  ],
  contact_number: [{required: true, message: "Please input your contact number", trigger: "blur"}],
  address: [{required: true, message: "Please input your address", trigger: "blur"}],
  password: [
    {required: true, message: "Please input your password", trigger: "blur"},
    {min: 6, message: "Password should be at least 6 characters", trigger: "blur"},
  ],
  email: [
    {required: true, message: "Please input your email", trigger: "blur"},
    {type: "email", message: "Please input a valid email", trigger: "blur"},
  ],
  telegram_contact: [{required: true, message: "Please input your telegram contact", trigger: "blur"}],
  driver_type: [{required: true, message: "Please input your driver type", trigger: "blur"}],
  driver_description: [{required: true, message: "Please input your driver description", trigger: "blur"}],
};

const create = async () => {
  const formData = new FormData();
  Object.keys(form).forEach(key => {
    if (form[key]) {
      formData.append(key, form[key]);
    }
  });
  try {
    await createDelivery(formData);
    ElMessage.success("Delivery created successfully!");
    router.go(-1);
  } catch (e) {
    console.error("Error creating delivery:", e);
    ElMessage.error("Failed to create delivery.");
  }
};

const handleFileChange = (event, field) => {
  const file = event.target.files[0];
  if (!file) return;

  if (field === 'cv' && file.type !== "application/pdf") {
    alert("Only PDF files are allowed!");
    return;
  }

  form[field] = file;
};

const formRef = ref(null);
const handleSubmit = () => {
  try {
    if (form.dob) {
      form.dob = dayjs(form.dob).format("YYYY-MM-DD");
    }
    formRef.value.validate(valid => {
      if (valid) {
        create();
      } else {
        ElMessage.error("Please fill in all required fields.");
      }
    });
  } catch (e) {
    console.error("Error creating delivery:", e);
    ElMessage.error("Failed to create delivery.");
  }
};
</script>

<template>
  <div class="form">
    <el-button type="warning" plain @click="navigateBack">
      <font-awesome-icon :icon="['fas', 'arrow-left']"/>
      Back
    </el-button>
    <h1>Create New Delivery</h1>
    <el-form ref="formRef" :model="form" :rules="rule" label-width="auto">
      <el-form-item label="Firstname" prop="first_name">
        <el-input v-model="form.first_name" placeholder="Enter your firstname"/>
      </el-form-item>
      <el-form-item label="Lastname" prop="last_name">
        <el-input v-model="form.last_name" placeholder="Enter your lastname"/>
      </el-form-item>
      <el-form-item label="Profile Image" prop="image">
        <input type="file" accept="image/*" @change="event => handleFileChange(event, 'image')"/>
      </el-form-item>
      <el-form-item label="CV" prop="cv">
        <input type="file" accept="application/pdf" @change="event => handleFileChange(event, 'cv')"/>
      </el-form-item>
      <el-form-item label="Gender" prop="gender">
        <el-select v-model="form.gender" placeholder="Please select your gender">
          <el-option label="Female" value="female"/>
          <el-option label="Male" value="male"/>
          <el-option label="Prefer not to say" value="not_specified"/>
        </el-select>
      </el-form-item>
      <el-form-item label="Date of Birth" prop="dob">
        <el-date-picker v-model="form.dob" type="date" placeholder="Pick a date"/>
      </el-form-item>
      <el-form-item label="Contact" prop="contact_number">
        <el-input v-model="form.contact_number" placeholder="Enter your phone number"/>
      </el-form-item>
      <el-form-item label="Location" prop="address">
        <el-input v-model="form.address" placeholder="Sangkat, Phnom Penh"/>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="example@gmail.com"/>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" placeholder="Enter Password"/>
      </el-form-item>
      <el-form-item label="Telegram" prop="telegram_contact">
        <el-input v-model="form.telegram_contact" placeholder="Link Telegram"/>
      </el-form-item>
      <el-form-item label="Driver Type" prop="driver_type">
        <el-input v-model="form.driver_type" placeholder="Enter driver type"/>
      </el-form-item>
      <el-form-item label="Driver Description" prop="driver_description">
        <el-input v-model="form.driver_description" placeholder="Enter driver description"/>
      </el-form-item>
      <el-form-item class="gap-3">
        <el-button type="primary" @click="handleSubmit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
h1 {
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
}

.form {
  width: 800px;
  height: auto;
  box-shadow: #888888 1px 1px 10px;
  padding: 10px;
  border-radius: 20px;
}
</style>
