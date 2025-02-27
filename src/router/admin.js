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
        component: () => import('@/views/pages/admin/screen/invoice.vue'),
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
        component: () => import('@/views/pages/admin/screen/logout.vue'),
      },
      {
        path: 'message',
        name: 'message',
        component: () => import('@/views/pages/admin/screen/message.vue'),
      },
      {
        path:'package-invoice',
        name:'package-invoice',
        component: () => import('@/views/pages/admin/screen/PackageInvoice.vue'),
      },
      {
        path:"vendor-invoice",
        name:"vendor-invoice",
        component: () => import('@/views/pages/admin/screen/VendorInvoice.vue'),
      },
      {
        path:"vendor",
        name:"vendor",
        component: () => import('@/views/pages/admin/screen/vendor/index.vue'),
      },
      {
        path:"delivery",
        name:"delivery",
        component: () => import('@/views/pages/admin/screen/delivery/index.vue'),
      },
      {
        path:"vendor-create",
        name:"vendor-create",
        component: () => import('@/views/pages/admin/screen/vendor/CreateVendor.vue'),
      },
      {
        path:"delivery-create",
        name:"delivery-create",
        component: () => import('@/views/pages/admin/screen/delivery/CreateDelivery.vue'),
      }
    ],
  },
];
