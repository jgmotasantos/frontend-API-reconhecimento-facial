import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import store from './store';
import ErrorDisplay from './components/GlobalErrorDisplay.vue'; // Importe o componente global de exibição de erros

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

const app = createApp(App);

const errorDisplay = createApp(ErrorDisplay);
const errorDisplayInstance = errorDisplay.mount(document.createElement('div'));
document.body.appendChild(errorDisplayInstance.$el);

// Configurar o interceptor
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        alert('Acesso requer autenticação');
        router.push('/auth/login');
      } else {
        errorDisplayInstance.showError(error);
      }
    } else {
      errorDisplayInstance.showError({
        response: {
          data: {
            message: 'Ocorreu um erro desconhecido.',
            error: 'Erro desconhecido'
          }
        }
      });
    }
    return Promise.reject(error);
  }
);

app
  .use(router)
  .use(store)
  .mount('#app');
