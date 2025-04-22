<template>
  <div class="settings-container">
    <h1 class="title">Settings</h1>

    <div class="settings-grid">
      <!-- Profile Section -->
      <el-card class="profile-card">
        <div class="profile-content">
          <el-avatar :size="150" :src="form.imagePreview || form.image || defaultAvatar" />
          <input type="file" class="upload-btn" accept="image/*" @change="handleFileUpload" />
          <div class="username">@seavyong</div>
        </div>
      </el-card>

      <!-- Information Section -->
      <el-card class="info-card">
        <h2>Personal Information</h2>
        <el-form :model="form" label-width="120px">
          <el-form-item label="Name">
            <el-input v-model="form.name" placeholder="Enter your name" />
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="form.email" placeholder="Enter your email" />
          </el-form-item>
          <el-form-item label="Phone">
            <el-input v-model="form.phone" placeholder="Enter your phone number" />
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- Save Button -->
    <div class="save-btn">
      <el-button type="warning" size="large" @click="onSubmit">Save Changes</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useSettingStore } from '@/store/setting.js';
import { ElMessage } from 'element-plus';

const form = reactive({
  name: '',
  phone: '',
  username: '',
  image: null, // Change from '' to null to properly handle files
  email: '',
  exchange_rate: '',
  delivery_fee: '',
});

const defaultAvatar = ref('https://via.placeholder.com/150'); // Default avatar
const settingStore = useSettingStore();
const { all, edit } = settingStore;

const fetchData = async () => {
  const { data } = await all();
  if (data) {
    Object.assign(form, data);
    if (data.image) {
      form.image = data.image; // Keep the existing image URL if available
    }
  }
};

// Handle file input and update preview
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.image = file; // Store the file object

    // Optional: Show a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      form.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const onSubmit = async () => {
  console.log('Form Submitted:', form);
  const formData = new FormData();

  // Append non-file fields
  Object.entries(form).forEach(([key, value]) => {
    if (key !== 'image' && key !== 'imagePreview') {
      formData.append(key, value);
    }
  });

  // Append file only if selected
  if (form.image instanceof File) {
    formData.append('image', form.image);
  }

  try {
    await edit(formData);
    ElMessage.success('Settings updated successfully');
  } catch (error) {
    console.error('Update failed:', error);
    ElMessage.error('Failed to update settings');
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.settings-container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.settings-grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.el-card {
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
}

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.username {
  font-size: 18px;
  margin-top: 10px;
  font-weight: bold;
}

.upload-btn {
  margin-top: 10px;
  cursor: pointer;
}

.info-card h2,
.currency-card h2,
.delivery-card h2 {
  font-size: 22px;
  margin-bottom: 15px;
}

.save-btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
