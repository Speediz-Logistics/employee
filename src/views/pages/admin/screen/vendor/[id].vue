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
  status: 1,
  image: null,  // For storing the image file
  image_url: '' // For storing the image URL
});

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const navigateBack = () => {
  router.go(-1);
};

onMounted(
  async () => {
  try {
    const vendorData = await showVendor(route.params?.id);
    Object.assign(form, {
      ...vendorData,
      dob: vendorData.dob ? dayjs(vendorData.dob).format('YYYY-MM-DD') : '',
      image_url: vendorData.image || '',
      status: vendorData.status ? '1' : '0',
    });
  } catch (error) {
    console.error('Error fetching vendor data:', error);
  }
});

const handleImageChange = (event, type) => {
  const file = event.target.files[0];
  if (!file) return;

  if (type === 'image') {
    form.image = file;
    dialogImageUrl.value = URL.createObjectURL(file);
  } else {
    alert('Invalid file type.');
  }
};
const onSubmit = async () => {
  try {
    const formData = new FormData();

    // Format dob to 'YYYY-MM-DD' before appending
    if (form.dob) {
      formData.append('dob', dayjs(form.dob).format('YYYY-MM-DD'));
    }

    Object.entries(form).forEach(([key, value]) => {
      if (key !== 'image_url' && value) {
        formData.append(key, value);
      }
    });

    if (form.image) {
      formData.append('image', form.image);
    }

    await editVendor(route.params.id, formData);
    ElMessage.success('Vendor updated successfully');
    navigateBack();
  } catch (e) {
    console.error('Error updating vendor:', e);
  }
};
</script>

<template>
  <div class="form">
    <el-button type="warning" plain @click="navigateBack">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
      Back
    </el-button>
    <h1>Edit Vendor</h1>


    <el-form :model="form" label-width="auto">
      <!-- Image Upload Section -->
      <div class="p-4">
        <!-- Image Preview -->
        <div v-if="form.image_url || dialogImageUrl" class="mb-3 profile">
          <img width="100" :src="form.image_url || dialogImageUrl" alt="Image preview" class="w-32 h-32 object-cover" />
        </div>
        <!-- File input tag for image upload -->
        <input
          type="file"
          accept="image/*"
          @change="(e) => handleImageChange(e, 'image')"
          ref="fileInput"
        />

        <!-- Image Preview Dialog -->
        <el-dialog v-model="dialogVisible" >
          <img :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
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
      <el-form-item label="Status">
        <el-select v-model="form.status">
          <el-option label="Active" value="1" />
          <el-option label="Inactive" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item class="gap-3">
        <el-button type="primary" @click="onSubmit">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.profile {
  width: 100px;
  height: 100px;
  border: solid 1px #000000;
}
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
