import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },

    // home
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },

    //seatpage
    {
      path: '/table',
      name: 'table',
      component: () => import('@/views/SeatPage/SeatView.vue')
    },

    // EmployeePage
    {
      path: '/employee',
      name: 'employee',
      component: () => import('@/views/EmployeePage/EmployeeView.vue')
    },

    // MenuPage
    {
      path: '/menulist',
      name: 'menu',
      component: () => import('@/views/MenuPage/MenuView.vue')
    },

    // orderPage
    {
      path: '/orderlist',
      name: 'order',
      component: () => import('@/views/OrderPage/OrderView.vue')
    },

    //checkoutPage
    {
      path: '/checkoutlist',
      name: 'checkout',
      component: () => import('@/views/CheckoutPage/CheckoutView.vue')
    },
  ]
})

export default router
