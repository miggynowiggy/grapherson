import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/signup/:typeOfUser',
    name: 'Signup',
    component: () => import('@/views/Signup.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/records',
    name: 'Records',
    component: () => import('@/views/Records.vue')
  },
  {
    path: '/view-records',
    name: 'ViewRecord',
    component: () => import('@/views/ViewRecord.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
