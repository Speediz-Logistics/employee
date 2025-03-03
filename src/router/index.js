import { createRouter, createWebHistory } from 'vue-router';
import guards from './guards';
import AdminRoutes from './admin.js';
import authenticated from "@/router/middlewares/redirectIfAuthenticated.js"; // Import the routes from vendor.js

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/admin/screen/Login.vue'),
    meta: { middlewares: [authenticated] }
  },
  {
    path: '/',
    name: 'default',
    redirect: '/admin',
    component: () => import('@/layouts/default.vue'),
  },

  // Integrate admin routes
  ...AdminRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
});

router.beforeEach(guards.beforeEach);
router.beforeResolve(guards.beforeResolve);
router.afterEach(guards.afterEach);

export default router;
