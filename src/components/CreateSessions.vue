<template>
    <div>
      <app-navbar></app-navbar>
      <div class="create-sessions-wrapper">
        <div class="container">
          <h1>Criar Sessão</h1>
          <div class="input-container">
            <input 
              class="session-input" 
              placeholder="Adicionar nova sessão..." 
              v-model="newSessionName" 
              @keyup.enter="addSession" 
              :disabled="loading"
            >
            <button 
              class="add-button" 
              @click="addSession" 
              :disabled="loading"
            >
              <i class="fa fa-plus-circle"></i>
            </button>
          </div>
          <div v-if="loading" class="loading-message">
            Adicionando sessão...
          </div>
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AppNavbar from './AppNavbar.vue';
  
  export default {
    name: 'CreateSessions',
    components: {
      AppNavbar,
    },
    data() {
      return {
        newSessionName: '',
        loading: false,
        successMessage: '',
        errorMessage: ''
      };
    },
    methods: {
  createSession() {
    this.loading = true;
    this.errorMessage = '';
    axios.post(`http://localhost:8000/grupos/${this.groupName}/sessoes/iniciar`, { sessionData: this.sessionData })  // Adicione a URL completa do servidor
      .then(response => {
        console.log('Sessão iniciada com sucesso:', response.data);
      })
      .catch(error => {
        this.errorMessage = 'Erro ao iniciar a sessão.';
        console.error('Erro ao iniciar a sessão:', error.response ? error.response.data : error.message);
      })
      .finally(() => {
        this.loading = false;
      });
      }
    }
  };
  </script>
  
  <style scoped>
  @import '../styles/CreateSessions.css';
  </style>
  