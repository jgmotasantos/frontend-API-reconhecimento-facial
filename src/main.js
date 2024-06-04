import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import store from './store'; // Importe o arquivo de configuração do Vuex

axios.defaults.baseURL = 'http://localhost:8080';

const app = createApp(App);

// Configurar o interceptor
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      // Exibir uma mensagem de erro ao usuário usando um alerta
      alert('Acesso requer autenticação');

      // Redirecionar para a página de login
      router.push('/auth/login');
    }
    return Promise.reject(error);
  }
);

app
  .use(router)
  .use(store) // Adicione o Vuex ao aplicativo
  .mount('#app');