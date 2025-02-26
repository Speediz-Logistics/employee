import { createRouter, createWebHistory } from 'vue-router';
import guards from './guards';
import vendorRoutes from './admin.js'; // Import the routes from admin.js

const routes = [
  {
    path: '/',
    name: 'default',
    component: () => import('../layouts/default.vue'), // Default layout with sidebar
  },
  // Spread vendorRoutes here to integrate them
  ...vendorRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
});

// Add guards (if necessary)
router.beforeEach(guards.beforeEach);
router.beforeResolve(guards.beforeResolve);
router.afterEach(guards.afterEach);

export default router;
