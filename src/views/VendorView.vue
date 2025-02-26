<script setup>
import { useMetaTag } from '@/composables/useMetaTag';
import AdminIndex from '@/views/pages/admin/index.vue';

// Set meta tags for SEO
useMetaTag({
  title: 'Speediz Vendor',
  name: 'Speediz | Vendor',
  description: 'Speediz Vendor',
  url: 'https://ite-alumni-dev.decapsoul.one/',
  image: 'https://mekmunsopheaktra.com/assets/images/logo.png',
  type: 'article',
  siteName: 'Coming Soon',
  locale: 'en_US',
});

const prefix = import.meta.env.VITE_PREFIX;
const prefixClass = {
  [`${prefix}-wrapper`]: true,
};
</script>

<template>
  <div :class="prefixClass">
    <AdminIndex />
  </div>
</template>
