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
    {
      path: '/table/Add',
      name: 'table-add',
      component: () => import('@/views/SeatPage/AddSeatView.vue')
    },
    {
      path: '/table/edit/:id',
      name: 'table-edit',
      component: () => import('@/views/SeatPage/EditSeatView.vue')
    },
    {
      path: '/table/detail/:id',
      name: 'table-detail',
      component: () => import('@/views/SeatPage/DetailSeatView.vue')
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
    {
      path: '/menulist/Add',
      name: 'menu-add',
      component: () => import('@/views/MenuPage/AddmenuView.vue')
    },
    {
      path: '/menulist/:id',
      name: 'menu-edit',
      component: () => import('@/views/MenuPage/EditmenuView.vue')
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
