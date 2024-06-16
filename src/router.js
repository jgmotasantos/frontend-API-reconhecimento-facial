import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from './components/LoginForm.vue'
import RegisterPage from './components/RegisterPage.vue'
import MyGroups from './components/MyGroups.vue'
import HomePage from './components/HomePage.vue'
import GroupDetails from './components/GroupDetails.vue'
import CreateGroup from './components/CreateGroup.vue'
import AddMember from './components/AddMember.vue'

const routes = [
  { path: '/auth/login', component: LoginForm },
  { path: '/auth/register', component: RegisterPage },
  { path: '/grupos', component: MyGroups },
  { path: '/home', component: HomePage },
  { path: '/grupos/:nomeDoGrupo/detalhes', name: 'GroupDetails', component: GroupDetails },
  { path: '/grupos/criar', component: CreateGroup },
  { path: '/grupos/:nomeDoGrupo/detalhes/adicionar', name: 'AddMember', component: AddMember }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
