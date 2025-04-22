<template>
  <div class="d-flex flex-column align-content-center gap-4 content-fade-in login-form-card">
    <h1 class="text-center">Please log in your account.</h1>
    <el-form ref="formRef" :model="dynamicValidateForm" label-width="auto" class="demo-dynamic gap-4">
      <el-form-item class prop="email" :rules="rules.email">
        <el-input
          v-model="dynamicValidateForm.email"
          placeholder="Enter your email"
          size="large"
          autocomplete="on"
          clearable
          :prefix-icon="Message"
        />
      </el-form-item>
      <el-form-item prop="password" :rules="rules.password">
        <el-input
          v-model="dynamicValidateForm.password"
          type="password"
          placeholder="Enter your password"
          show-password
          size="large"
          :prefix-icon="Key"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="input" v-on:click="handleLogin">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { Message, Key } from '@element-plus/icons-vue';
import useNavigate from '@/composables/useNavigate.js';
import { useAuthStore } from '@/store/auth'; // Import the auth store

const { navigateTo } = useNavigate();

// Define the router for navigation
const router = useRouter();
const remember = ref(false);

// Define the form data using reactive
const dynamicValidateForm = reactive({
  email: '',
  password: '',
});

// Define the rules for form validation
const rules = {
  email: [
    { required: true, message: 'Please input email address', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: 'Please enter password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
  ],
};

// Reference for form validation
const formRef = ref(null);

// Use the Auth Store
const authStore = useAuthStore();

// Handle login action
const handleLogin = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // Attempt to log in using the auth store
        await authStore.login({
          email: dynamicValidateForm.email,
          password: dynamicValidateForm.password,
        });
        // Redirect to the dashboard page after login
        router.push({ name: 'dashboard' }); // Change 'dashboard' to your actual dashboard route name
      } catch (error) {
        // Show error message on login failure
        ElMessage.error(error.response?.data?.message || 'Login failed. Please try again.');
      }
    } else {
      ElMessage.error('Please fill in the form correctly');
    }
  });
};
</script>

<style scoped>
.input {
  width: 100%;
}

.el-form-item .el-input,
.el-form-item .el-button {
  width: 100%;
}

.el-button {
  background: #ffbd59;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
}

.el-button:active {
  opacity: 0.7;
}

.login-form-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 0.5px solid #ffbd59;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 500px;
  height: 300px;
}
</style>
