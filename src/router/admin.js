export default [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'admin.index',
        component: () => import('@/views/pages/admin/index.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/pages/admin/screen/login.vue'),
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/pages/admin/screen/dashboard.vue'),
      },
      {
        path: 'on-board-screen',
        name: 'on-board-screen',
        component: () => import('@/views/pages/admin/screen/OnBoardScreen.vue'),
      },
      {
        path: 'vendor-list',
        name: 'vendor-list',
        component: () => import('@/views/pages/admin/screen/VendorList.vue'),
      },
      {
        path: 'invoice',
        name: 'invoice',
        component: () => import('@/views/pages/admin/screen/Invoice.vue'),
      },
      {
        path: 'tracking',
        name: 'tracking',
        component: () => import('@/views/pages/admin/screen/Tracking.vue'),
      },
      {
        path: 'user-management',
        name: 'user-management',
        component: () => import('@/views/pages/admin/screen/UserManagement.vue'),
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/pages/admin/screen/Setting.vue'),
      },
      {
        path: 'logout',
        name: 'logout',
        component: () => import('@/views/pages/admin/screen/Logout.vue'),
      },
      {
        path: 'message',
        name: 'message',
        component: () => import('@/views/pages/admin/screen/Message.vue'),
      },
    ],
  },
];
