import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/MenuView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue')
    },
    {
      path: '/order/:id',
      name: 'order',
      component: () => import('@/views/CustommerOrderView.vue')
    },
    {
      path: '/checkout/:id',
      name: 'checkout',
      component: () => import('@/views/CheckOutView.vue')
    },
  ]
})

export default router
