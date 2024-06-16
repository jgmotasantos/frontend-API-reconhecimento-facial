// router/index.js ou similar
import { createRouter, createWebHistory } from 'vue-router';
import GroupDetails from '@/components/GroupDetails.vue';
import AddMember from '@/components/AddMember.vue';

const routes = [
  // outras rotas...
  {
    path: '/grupos/:nomeDoGrupo/detalhes',
    name: 'GroupDetails',
    component: GroupDetails
  },
  {
    path: '/grupos/:nomeDoGrupo/detalhes/adicionar',
    name: 'AddMember',
    component: AddMember
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
