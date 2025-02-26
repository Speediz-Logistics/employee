<template>
  <div class="d-flex">
    <!-- Sidebar Component -->
    <Sidebar />

    <!-- Main Content Area -->
    <div class="flex-fill p-4">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
</script>
