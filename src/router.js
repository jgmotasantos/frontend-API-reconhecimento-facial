import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import RegisterPage from './components/RegisterPage.vue';
import MyGroups from './components/MyGroups.vue';
import HomePage from './components/HomePage.vue';
import GroupDetails from './components/GroupDetails.vue';
import CreateGroup from './components/CreateGroup.vue';
import AddMember from './components/AddMember.vue';
import MySessions from './components/MySessions.vue';
import CreateSessions from './components/CreateSessions.vue';

const routes = [
  { path: '/auth/login', component: LoginForm },
  { path: '/auth/register', component: RegisterPage },
  { path: '/grupos', component: MyGroups },
  { path: '/home', component: HomePage },
  { path: '/grupos/:nomeDoGrupo/detalhes', name: 'GroupDetails', component: GroupDetails },
  { path: '/grupos/criar', component: CreateGroup },
  { path: '/grupos/:nomeDoGrupo/detalhes/adicionar', name: 'AddMember', component: AddMember },
  { path: '/sessoes/iniciar', component: MySessions },
  { path: '/sessoes/criar', component: CreateSessions },
  { path: '/grupos/:nomeDoGrupo/sessoes/encerradas', name: 'MySessions', component: MySessions },
  { path: '/grupos/:nomeDoGrupo/sessoes/iniciar', name: 'CreateSessions', component: CreateSessions } // Adicionada a nova rota
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

let lastRoute = '';

router.beforeEach((to, from, next) => {
  if (from.path !== '/') {
    lastRoute = from.fullPath;
  }
  next();
});

export { router, lastRoute };
export default router;
