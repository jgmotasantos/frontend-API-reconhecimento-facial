import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from './components/LoginForm.vue'
import RegisterPage from './components/RegisterPage.vue'
import MyGroups from './components/MyGroups.vue'
import HomePage from './components/HomePage.vue'
import GroupDetails from './components/GroupDetails.vue'

const routes = [
  { path: '/auth/login', component: LoginForm },
  { path: '/auth/register', component: RegisterPage },
  { path: '/grupos', component: MyGroups }, // Nova rota
  { path: '/home', component: HomePage },
  { path: '/grupos/:nomeDoGrupo', component: GroupDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
