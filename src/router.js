import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import RegisterPage from './components/RegisterPage.vue';
import MyGroups from './components/MyGroups.vue';
import CreateGroup from './components/CreateGroup.vue'; // Importar o novo componente
import HomePage from './components/HomePage.vue';

const routes = [
  { path: '/auth/login', component: LoginForm },
  { path: '/auth/register', component: RegisterPage },
  { path: '/grupos', component: MyGroups }, // Rota existente para visualizar grupos
  { path: '/grupos/criar', component: CreateGroup }, // Nova rota para criar grupo
  { path: '/home', component: HomePage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
