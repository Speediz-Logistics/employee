import requiredAuth from '@/router/middlewares/requiredAuth.js';

export default [
  {
    path: '/employee',
    name: 'employee',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'employee.index',
        component: () => import('@/views/pages/employee/screen/dashboard.vue'),
        meta: { middlewares: [requiredAuth] },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/pages/employee/screen/dashboard.vue'),
        meta: { middlewares: [requiredAuth] },
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/pages/employee/screen/Setting.vue'),
      },
      {
        path: 'logout',
        name: 'logout',
        component: () => import('@/views/pages/employee/screen/Logout.vue'),
      },
      {
        path: 'package',
        name: 'package',
        component: () => import('@/views/pages/employee/screen/package/index.vue'),
      },
      {
        path: 'package-detail/:id',
        name: 'package-detail',
        component: () => import('@/views/pages/employee/screen/package/[id].vue'),
      },
      {
        path: 'package-add',
        name: 'package-add',
        component: () => import('@/views/pages/employee/screen/package/create.vue'),
      },
    ],
  },
];
