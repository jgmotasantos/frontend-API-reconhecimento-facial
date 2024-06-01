import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import store from './store' // Importe o arquivo de configuração do Vuex

axios.defaults.baseURL = 'http://localhost:8080'; 

createApp(App)
  .use(router)
  .use(store) // Adicione o Vuex ao aplicativo
  .mount('#app')