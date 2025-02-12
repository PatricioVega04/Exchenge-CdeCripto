
 import { createRouter, createWebHistory } from 'vue-router'
 import EntryView from '@/views/EntryView.vue'
 import HomeView from '../views/HomeView.vue'
 
const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/Entry',
    name: 'EntryView',
    component: EntryView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
