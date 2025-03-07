<script setup>
import { reactive } from 'vue'
import { useRouter } from "vue-router";
import { useDeliveryStore } from "@/store/delivery.js";
import dayjs from "dayjs";

const deliveryStore = useDeliveryStore();
const { createDelivery } = deliveryStore;
const router = useRouter();

const navigateBack = () => {
  router.go(-1);
};
// Form data
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
  telegram_contact: ''
});

// Validation rules
const rule = {
  first_name: [
    { required: true, message: "Please input your first name", trigger: "blur" },
  ],
  last_name: [
    { required: true, message: "Please input your last name", trigger:"blur" },
  ],
  cv: [
    { required: true, message: "Please upload your CV", trigger: "blur" },
    { type: "file", message: "Please upload a PDF file", trigger: "change" },
    { size: 1024, message: "File size should be less than 1MB", trigger: "change" }
  ],
  contact_number: [
    { required: true, message: "Please input your contact number", trigger: "blur" },
  ],
  address: [
    { required: true, message: "Please input your address", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input your password", trigger: "blur" },
    { min: 6, message: "Password should be at least 6 characters", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Please input your email", trigger: "blur" },
    { type: "email", message: "Please input a valid email", trigger: "blur" },
  ],
}

const create = async () => {
  const formData = new FormData();
  formData.append("first_name", form.first_name);
  formData.append("last_name", form.last_name);
  formData.append("gender", form.gender);
  formData.append("dob", form.dob);
  formData.append("contact_number", form.contact_number);
  formData.append("address", form.address);
  formData.append("email", form.email);
  formData.append("password", form.password);
  formData.append("telegram_contact", form.telegram_contact);

  if (form.cv) {
    formData.append("cv", form.cv);
  }

  try {
    await createDelivery(formData);
    ElMessage.success("Delivery created successfully!");
    router.go(-1);
  } catch (e) {
    console.error("Error creating delivery:", e);
    ElMessage.error("Failed to create delivery.");
  }
};

const handlePDFChange = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  if (file.type !== "application/pdf") {
    alert("Only PDF files are allowed!");
    return;
  }

  form.cv = file; // Store file object, no preview
};
const formRef = ref(null);
const handleSubmit = () => {
  try{
    if(form.dob){
      form.dob = dayjs(form.dob).format("YYYY-MM-DD");
    }
    formRef.value.validate((valid) => {
      if (valid) {
        create(); // Proceed with form submission
      } else {
        ElMessage.error("Please fill in all required fields.");
      }
    });
  }catch (e) {
    console.error("Error creating delivery:", e);
    ElMessage.error("Failed to create delivery.");
  }
};

</script>

<template>
  <div class="form">
    <el-button type="warning" plain @click="navigateBack">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
      Back
    </el-button>
    <h1>Create New Delivery</h1>
    <el-form ref="formRef" :model="form" :rules="rule" label-width="auto">
      <el-form-item label="Firstname" prop="first_name">
        <el-input v-model="form.first_name" placeholder="Enter your firstname" />
      </el-form-item>
      <el-form-item label="Lastname" prop="last_name">
        <el-input v-model="form.last_name" placeholder="Enter your lastname"/>
      </el-form-item>
      <el-form-item label="CV" prop="cv">
        <!-- File input tag for PDF upload -->
        <input
          type="file"
          accept="application/pdf"
          @change="handlePDFChange"
          ref="fileInput"
        />
      </el-form-item>
      <el-form-item label="Gender" prop="gender">
        <el-select v-model="form.gender" placeholder="please select your gender">
          <el-option label="Female" value="female" />
          <el-option label="Male" value="male" />
          <el-option label="Prefer not to say" value="not_specified" />
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
        <el-input v-model="form.telegram_contact" placeholder="link telegram"/>
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
  justify-content: center;
  justify-items: center;
  text-align: center;
  margin-bottom: 10px;
}
.form {
  width: 800px;
  height: 800px;
  box-shadow: #888888 1px 1px 10px;
  padding: 10px;
  border-radius: 20px;
}
.el-content {
  font-size: 20px;
}
</style>
