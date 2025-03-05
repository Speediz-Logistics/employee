import authenticated from "@/router/middlewares/redirectIfAuthenticated.js";
import requiredAuth from "@/router/middlewares/requiredAuth.js";

export default [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'admin.index',
        component: () => import('@/views/pages/admin/screen/dashboard.vue'),
        meta: { middlewares: [requiredAuth] },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/pages/admin/screen/dashboard.vue'),
        meta: { middlewares: [requiredAuth] },
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
        path: 'tracking-detail/:id',
        name: 'tracking-detail',
        component: () => import('@/views/pages/admin/screen/tracking-detail/[id].vue')
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
        path:"vendor-edit/:id",
        name:"vendor-edit",
        component: () => import('@/views/pages/admin/screen/vendor/[id].vue'),
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
