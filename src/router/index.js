import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import AuthLogin from '../views/AuthLogin.vue'
import AuthSignup from '../views/AuthSignup.vue'
import Dashboard from '../views/Dashboard.vue'
import Tickets from '../views/Tickets.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Landing', component: Landing },
    { path: '/auth/login', name: 'Login', component: AuthLogin },
    { path: '/auth/signup', name: 'Signup', component: AuthSignup },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/tickets',
      name: 'Tickets',
      component: Tickets,
      meta: { requiresAuth: true }
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

// route guard
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.session) {
    window.$toast('Your session has expired — please log in again.', 'error')
    return '/auth/login'
  }
})

export default router
