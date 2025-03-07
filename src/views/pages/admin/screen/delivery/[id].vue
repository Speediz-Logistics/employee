<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { useDeliveryStore } from '@/store/delivery.js';

const { editDelivery, showDelivery } = useDeliveryStore();
const router = useRouter();
const route = useRoute();

const form = reactive({
  first_name: '',
  last_name: '',
  gender: '',
  dob: '',
  contact_number: '',
  address: '',
  email: '',
  password: '',
  telegram_contact: '',
  driver_type: '',
  driver_description: '',
  image: null,
  image_url: '',
  cv: null,
  cv_url: '',
  status: 1,
});

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);
const cvFileName = ref('');

const navigateBack = () => router.go(-1);

onMounted(async () => {
  try {
    const vendorData = await showDelivery(route.params.id);
    Object.assign(form, {
      ...vendorData,
      dob: vendorData.dob ? dayjs(vendorData.dob).format('YYYY-MM-DD') : '',
      image_url: vendorData.image || '',
      cv_url: vendorData.cv || '',
      status: vendorData.status ? '1' : '0',
    });
    if (vendorData.cv) {
      cvFileName.value = vendorData.cv.split('/').pop();
    }
  } catch (error) {
    console.error('Error fetching vendor data:', error);
  }
});

const handleFileChange = (event, type) => {
  const file = event.target.files[0];
  if (!file) return;

  if (type === 'image') {
    form.image = file;
    dialogImageUrl.value = URL.createObjectURL(file);
  } else if (type === 'cv' && file.type === 'application/pdf') {
    form.cv = file;
    cvFileName.value = file.name;
  } else {
    alert('Invalid file type.');
  }
};

const onSubmit = async () => {
  try {
    const formData = new FormData();

    // Format dob to 'YYYY-MM-DD' before appending
    if (form.dob) {
      form.dob = dayjs(form.dob).format('YYYY-MM-DD');
    }

    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    await editDelivery(route.params.id, formData);
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
      <el-form-item label="Firstname">
        <el-input v-model="form.first_name" />
      </el-form-item>
      <el-form-item label="Lastname">
        <el-input v-model="form.last_name" />
      </el-form-item>
      <el-form-item label="Profile Image">
        <div class="d-flex">
          <div v-if="form.image_url || dialogImageUrl" class="mb-3">
            <img width="100" :src="form.image_url || dialogImageUrl" alt="Image preview" class="w-32 h-32 object-cover" />
          </div>
          <input type="file" accept="image/*" @change="(e) => handleFileChange(e, 'image')" />
        </div>
        <el-dialog v-model="dialogVisible">
          <img width="100" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="Upload CV (PDF)">
        <div class="d-flex flex-column">
          <input type="file" accept="application/pdf" @change="(e) => handleFileChange(e, 'cv')" />
          <a v-if="form.cv_url" :href="form.cv_url" target="_blank">View CV</a>
        </div>
      </el-form-item>
      <el-form-item label="Gender">
        <el-select v-model="form.gender">
          <el-option label="Female" value="female" />
          <el-option label="Male" value="male" />
          <el-option label="Prefer not to say" value="prefer not to say" />
        </el-select>
      </el-form-item>
      <el-form-item label="Date of Birth">
        <el-date-picker v-model="form.dob" type="date" format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="Contact">
        <el-input v-model="form.contact_number" />
      </el-form-item>
      <el-form-item label="Location">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" />
      </el-form-item>

      <el-form-item label="Telegram Contact">
        <el-input v-model="form.telegram_contact" />
      </el-form-item>
      <el-form-item label="Driver Type">
        <el-input v-model="form.driver_type" />
      </el-form-item>
      <el-form-item label="Driver Description">
        <el-input v-model="form.driver_description" />
      </el-form-item>
      <el-form-item label="Status" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="1">Active</el-radio>
          <el-radio label="0">Inactive</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-form-item>
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
  margin-bottom: 10px; /* Add margin to space out the image from the input */
}

.d-flex {
  display: flex;
  flex-direction: column;
}

input[type="file"] {
  margin-top: 10px; /* Add margin to separate the file input from the image preview */
}

h1 {
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
}

.form {
  width: 800px;
  box-shadow: #888888 1px 1px 10px;
  padding: 20px;
  border-radius: 20px;
  margin: auto;
}

.cv-name {
  font-size: 14px;
  color: #007bff;
  margin-top: 5px;
}

</style>
