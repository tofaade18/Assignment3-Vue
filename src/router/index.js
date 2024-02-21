import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Homeview.vue'
import MenuView from '../views/Menuview.vue'
import BookingView from '../views/Bookview.vue'
import AboutView from '../views/Aboutview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/menu',
      name: 'menu',
      component:MenuView
    },
    {
      path: '/booking',
      name: 'booking',
      component:BookingView
    },
    {
      path: '/about',
      name: 'about',
      component:AboutView
    }
  ],
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router