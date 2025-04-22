import { createRouter, createWebHistory } from 'vue-router';
import guards from './guards';
import EmployeeRoutes from './employee.js';
import authenticated from '@/router/middlewares/redirectIfAuthenticated.js'; // Import the routes from vendor.js

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/employee/screen/Login.vue'),
    meta: { middlewares: [authenticated] },
  },
  {
    path: '/',
    name: 'default',
    redirect: '/employee',
    component: () => import('@/layouts/default.vue'),
  },

  // Integrate employee routes
  ...EmployeeRoutes,
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
