<template>
  <div class="page">
    <i class="speediz-image speediz-image-vendor-welcome" />
  </div>
  <div class="row container">
    <div class="col-4 icon">
      <img src="@/assets/icon/loginScreenIcon.svg" alt="loginScreenIcon" />
    </div>
    <div class="col-8 login-form mx-auto d-flex flex-column gap-3">
      <i class="speediz-image speediz-image-logo-primary" />
      <loginForm></loginForm>
    </div>
  </div>
</template>

<script setup>
import loginForm from '@/components/LoginForm.vue';
</script>

<style scoped lang="scss">
.page {
  animation: content-fade-in 0.6s ease-in-out;
}

.container {
  height: 100vh;
  max-width: 100%;
  align-items: center;
  gap: 20px; // Add spacing between the columns
  animation: content-fade-in 0.6s;
}

.icon {
  padding: 70px;
  z-index: 2;
}

.login-form {
  flex: 1; // Takes remaining space
  z-index: 3;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column; // Stack items on smaller screens
    align-items: center;
  }

  .icon {
    margin-bottom: 20px; // Add spacing when stacked
  }

  .login-form {
    width: 90%; // Full-width for smaller screens
    max-width: none;
  }
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
</style>
