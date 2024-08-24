import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/userdata',
      name: 'userdata',
      component: () => import('@/views/ShowDataView.vue')
    },
    {
      path: '/admin',
      name: 'admin-home',
      component: () => import('@/views/ADminView.vue')
    },
    {
      path: '/user',
      name: 'user-home',
      component: () => import('@/views/UserView.vue')
    }
  ]
})

export default router
