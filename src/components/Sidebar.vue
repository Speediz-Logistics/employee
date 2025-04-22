<template>
  <aside class="sidebar bg-light d-flex flex-column justify-content-between p-3 border-end">
    <!-- Logo -->
    <div class="d-flex flex-column">
      <div class="d-flex justify-content-center mb-4">
        <img src="@/assets/images/speediz-logo.png" alt="Project Logo" class="w-75" />
      </div>

      <!-- Navigation -->
      <el-menu :default-active="$route.path" class="w-100" router>
        <el-menu-item index="/employee/dashboard" class="nav-item">
          <el-icon>
            <Clock />
          </el-icon>
          <span>Dashboard</span>
        </el-menu-item>

        <el-menu-item index="/employee/package" class="nav-item">
          <el-icon>
            <Goods />
          </el-icon>
          <span>Package Management</span>
        </el-menu-item>

        <el-menu-item index="/employee/setting" class="nav-item">
          <el-icon>
            <Setting />
          </el-icon>
          <span>Setting</span>
        </el-menu-item>

        <el-menu-item index="/employee/logout" class="nav-item">
          <el-icon>
            <SwitchButton />
          </el-icon>
          <span>Logout</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- Profile Section -->
    <div class="d-flex flex-column align-items-center border-top pt-3 mt-auto">
      <img src="@/assets/logo.svg" alt="Profile" class="rounded-circle border border-warning w-25 mb-2" />
      <div class="small fw-medium text-muted">laseavyong@gmail.com</div>
    </div>
  </aside>
</template>

<script setup>
import { Clock, Goods, Setting, SwitchButton } from '@element-plus/icons-vue';
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #f8f9fa;
  position: sticky;
  top: 0;
  left: 0;
  overflow-y: auto; /* Allows scrolling if content is taller than viewport */
}

.el-menu-item.is-active {
  background-color: #ffc107 !important;
  color: #fff !important;
  border-radius: 10px;
}

.el-menu {
  width: 100%;
  border-right: none;
}
</style>
