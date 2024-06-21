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
import OpenSessions from './components/OpenSessions.vue';
import SessionDetails from './components/SessionDetails.vue'; // Importando a nova página
import FaceValidation from './components/FaceValidation.vue'; // Importando a página FaceValidation

const routes = [
  { path: '/auth/login', component: LoginForm },
  { path: '/auth/register', component: RegisterPage },
  { path: '/grupos', component: MyGroups },
  { path: '/home', component: HomePage },
  { path: '/grupos/:nomeDoGrupo/detalhes', name: 'GroupDetails', component: GroupDetails },
  { path: '/grupos/criar', component: CreateGroup },
  { path: '/grupos/:nomeDoGrupo/detalhes/adicionar', name: 'AddMember', component: AddMember },
  { path: '/grupos/:nomeDoGrupo/sessoes/encerradas', name: 'MySessions', component: MySessions },
  { path: '/grupos/:nomeDoGrupo/sessoes/iniciar', name: 'CreateSessions', component: CreateSessions },
  { path: '/grupos/:nomeDoGrupo/sessoes/em-andamento', name: 'OpenSessions', component: OpenSessions },
  { path: '/grupos/:nomeDoGrupo/sessoes/:nomeDaSessao/detalhes', name: 'SessionDetails', component: SessionDetails },
  { path: '/grupos/:nomeDoGrupo/sessoes/:nomeDaSessao/validar-face', name: 'FaceValidation', component: FaceValidation }, // Adicionando a rota para FaceValidation
  { path: '/sessoes/iniciar', redirect: '/grupos/:nomeDoGrupo/sessoes/iniciar' } // Redireciona para a rota com nomeDoGrupo
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
