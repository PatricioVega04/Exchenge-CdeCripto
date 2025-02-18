
 import { createRouter, createWebHistory } from 'vue-router'
 import EntryView from '@/views/EntryView.vue'
 import HomeView from '../views/HomeView.vue'
 import AssetsView from '@/views/AssetsView.vue'
import BuyCriptoView from '@/views/BuyCriptoView.vue'
import HistoryView from '@/views/HistoryView.vue'
import TransactionDetailView from '@/views/TransactionDetailView.vue';
import TransactionEditView from '@/views/TransactionEditView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/entry',
    name: 'EntryView',
    component: EntryView,
  },
  {
    path: '/assets',
    name:'Assets',
    component: AssetsView
  },
  {
    path: '/buy-cripto',
    name: 'BuyCripto',
    component: BuyCriptoView
  },
  {
    path:'/history',
    name: 'History',
    component: HistoryView
  },
  { path: '/transaction/:id', 
    name: 'TransactionDetail', 
    component: TransactionDetailView 
  },
  { path: '/transaction/:id/edit', 
    name: 'TransactionEdit', 
    component: TransactionEditView 
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
