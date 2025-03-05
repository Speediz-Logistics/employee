<script setup>
import { reactive, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVendorStore } from '@/store/vendor.js';
import dayjs from 'dayjs';

const { editVendor, showVendor } = useVendorStore();
const router = useRouter();
const route = useRoute();

const form = reactive({
  first_name: '',
  last_name: '',
  business_name: '',
  gender: '',
  dob: '',
  contact_number: '',
  address: '',
  email: '',
  password: '',
  image: '',  // For storing the image file
  image_url: '' // For storing the image URL
});

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);

const navigateBack = () => {
  router.go(-1);
};

onMounted(async () => {
  const id = route.params.id;
  try {
    const vendorData = await showVendor(id);  // Assuming this returns vendor data
    form.first_name = vendorData.first_name;
    form.last_name = vendorData.last_name;
    form.business_name = vendorData.business_name;
    form.gender = vendorData.gender;
    form.dob = vendorData.dob ? dayjs(vendorData.dob).format('YYYY-MM-DD') : null;
    form.contact_number = vendorData.contact_number;
    form.address = vendorData.address;
    form.email = vendorData.email;
    form.password = vendorData.password || '';
    form.image_url = vendorData.image || '';  // Assuming vendor has an image_url field
  } catch (error) {
    console.error('Error fetching vendor data:', error);
  }
});

const handleImageChange = (event) => {
  const file = event.target.files[0];  // Get the selected file
  if (file) {
    form.image = file;  // Save the image file to the form data
    // Display the selected image for preview
    dialogImageUrl.value = URL.createObjectURL(file);
  }
};

const onSubmit = async () => {
  const id = route.params.id;  // Get the vendor ID from route params
  try {
    const formData = new FormData();
    // If image has changed, append the new image to the FormData
    if (form.image) {
      formData.append('image', form.image);  // Append the new image file
    } else if (form.image_url) {
      formData.append('image', form.image_url); // Keep the old image URL if image hasn't changed
    }
    formData.append('first_name', form.first_name);
    formData.append('last_name', form.last_name);
    formData.append('business_name', form.business_name);
    formData.append('gender', form.gender);
    formData.append('dob', dayjs(form.dob).format('YYYY-MM-DD'));
    formData.append('contact_number', form.contact_number);
    formData.append('address', form.address);
    formData.append('email', form.email);
    formData.append('password', form.password || '');

    await editVendor(id, formData);  // Pass vendor ID and form data to edit function
    router.go(-1);
  } catch (e) {
    console.error('Error updating vendor:', e);
  }
};

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};
</script>

<template>
  <div class="form">
    <el-button type="warning" plain @click="navigateBack">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
      Back
    </el-button>
    <h1>Edit Vendor</h1>

    <!-- Image Upload Section -->
    <div class="p-4">
      <!-- File input tag for image upload -->
      <input
        type="file"
        accept="image/*"
        @change="handleImageChange"
        ref="fileInput"
      />
      <!-- Image Preview -->
      <div v-if="form.image_url || dialogImageUrl" class="mt-3">
        <img :src="form.image_url || dialogImageUrl" alt="Image preview" class="w-32 h-32 object-cover" />
      </div>

      <!-- Image Preview Dialog -->
      <el-dialog v-model:visible="dialogVisible">
        <img class="w-full" :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>

    <el-form :model="form" label-width="auto">
      <el-form-item label="Firstname">
        <el-input v-model="form.first_name" placeholder="Enter your firstname" />
      </el-form-item>
      <el-form-item label="Lastname">
        <el-input v-model="form.last_name" placeholder="Enter your lastname" />
      </el-form-item>
      <el-form-item label="Business name">
        <el-input v-model="form.business_name" placeholder="Enter your Business name" />
      </el-form-item>
      <el-form-item label="Gender">
        <el-select v-model="form.gender" placeholder="Please select your gender">
          <el-option label="Female" value="female" />
          <el-option label="Male" value="male" />
          <el-option label="Prefer not to say" value="prefer not to say" />
        </el-select>
      </el-form-item>
      <el-form-item label="Date of Birth">
        <el-date-picker v-model="form.dob" type="date" format="YYYY-MM-DD" placeholder="Pick a date" />
      </el-form-item>
      <el-form-item label="Contact">
        <el-input v-model="form.contact_number" placeholder="Enter your phone number" />
      </el-form-item>
      <el-form-item label="Location">
        <el-input v-model="form.address" placeholder="Sangkat, Phnom Penh" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" placeholder="example@gmail.com" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password" v-model="form.password" placeholder="Enter Password" />
      </el-form-item>
      <el-form-item class="gap-3">
        <el-button type="primary" @click="onSubmit">Update</el-button>
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
  padding: 20px;
  border-radius: 20px;
  margin: auto;
}
</style>
