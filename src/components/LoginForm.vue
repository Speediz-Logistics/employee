<template>
  <div class="login-form-container">
    <div class="login-form-card content-fade-in">
      <div class="form-header text-center mb-5">
        <h1 class="fw-bold mb-3">Welcome Back</h1>
        <p class="text-muted">Please log in to your account</p>
      </div>

      <el-form
        ref="formRef"
        :model="dynamicValidateForm"
        label-position="top"
        class="login-form"
        require-asterisk-position="right"
        @keyup.enter="handleLogin"
      >
        <el-form-item label="Email" prop="email" :rules="rules.email">
          <el-input
            v-model="dynamicValidateForm.email"
            placeholder="Enter your email"
            size="large"
            autocomplete="username"
            clearable
            :prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item label="Password" prop="password" :rules="rules.password">
          <el-input
            v-model="dynamicValidateForm.password"
            type="password"
            placeholder="Enter your password"
            show-password
            size="large"
            autocomplete="current-password"
            :prefix-icon="Key"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="large" class="login-btn" :loading="authStore.loading" @click="handleLogin">
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage, ElLoading } from 'element-plus';
import { useRouter } from 'vue-router';
import { Message, Key } from '@element-plus/icons-vue';
import useNavigate from '@/composables/useNavigate.js';
import { useAuthStore } from '@/store/auth';

const { navigateTo } = useNavigate();
const router = useRouter();
const authStore = useAuthStore();

const dynamicValidateForm = reactive({
  email: '',
  password: '',
});

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

const formRef = ref(null);

const handleLogin = async () => {
  try {
    const valid = await formRef.value.validate();
    if (!valid) return;

    const loadingInstance = ElLoading.service({
      lock: true,
      text: 'Logging in...',
      background: 'rgba(0, 0, 0, 0.7)',
    });

    await authStore.login({
      email: dynamicValidateForm.email,
      password: dynamicValidateForm.password,
    });

    loadingInstance.close();
    router.push({ name: 'dashboard' });
  } catch (error) {
    ElMessage.error(error.response?.data?.message || 'Login failed. Please try again.');
  }
};
</script>

<style scoped lang="scss">
.login-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f8f9fa;
}

.login-form-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 189, 89, 0.3);
  padding: 2.5rem;
  width: 100%;
  max-width: 500px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
  }
}

.form-header {
  h1 {
    color: #333;
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }
}

.login-form {
  .el-form-item {
    margin-bottom: 1.5rem;

    :deep(.el-form-item__label) {
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: #555;
    }
  }
}

.login-btn {
  width: 100%;
  background-color: #ffbd59;
  border: none;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s;

  &:hover {
    background-color: darken(#ffbd59, 10%);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

.content-fade-in {
  animation: content-fade-in 0.6s ease-in-out;
}

@keyframes content-fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 576px) {
  .login-form-card {
    padding: 1.5rem;
    border: none;
    box-shadow: none;
  }

  .form-header {
    h1 {
      font-size: 1.5rem;
    }
  }
}
</style>
