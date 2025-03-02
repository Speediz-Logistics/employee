

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="d-flex flex-column content rounded-4 p-4 text-center">
      <img src="@/assets/images/speediz-logo2.png" alt="logo project" class="mb-3">
      <h1 class="fw-bold mt-3">Logout</h1>
      <p>Are you sure you want to logout?</p>
      <div class="d-flex justify-content-center gap-3 mt-3">
        <el-button type="warning" @click="handleLogout">Logout</el-button>
        <el-button @click="navigateBack">Cancel</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {useAuthStore} from "@/store/auth.js";
const authStore = useAuthStore();
const router = useRouter()
const navigateBack = () => {
  router.go(-1)
}

const handleLogout = () => {
  authStore.logout();
  router.push({name: 'login'})
}
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
h1{
  font-size: 30px;
}

.content {
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: #888888 1px 1px 10px;
  border-radius: 20px;
}

.vh-100 {
  height: 100vh;
}
</style>
