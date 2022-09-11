import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      
      { path: 'dashboard', component: () => import('pages/DashBoardPage.vue') ,meta:{ requiresAuth:true }}],
  },


  {
    path: '/login',
    children: [
      { path: '', component: () => import('pages/LoginPage.vue')}],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
