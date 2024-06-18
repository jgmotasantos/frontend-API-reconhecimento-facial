<template>
    <div>
      <os-navbar :groupName="groupName"></os-navbar>
      <div class="open-sessions-wrapper">
        <div class="container">
          <h1>Presenças em Andamento</h1>
          <div v-if="loading" class="loading-message">Carregando sessões...</div>
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          <div v-if="sessions.length === 0 && !loading" class="empty-message">Nenhuma sessão em andamento.</div>
          <ul v-if="sessions.length > 0" class="sessions-list">
            <li v-for="session in sessions" :key="session._id" class="session-item">
              <h2>{{ session.name }}</h2>
              <p>Iniciada em: {{ formatDate(session.startTime) }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import OsNavbar from './OsNavbar.vue';
  
  export default {
    name: 'OpenSessions',
    components: {
      'os-navbar': OsNavbar,
    },
    data() {
      return {
        sessions: [],
        loading: false,
        errorMessage: '',
        groupName: this.$route.params.nomeDoGrupo // Obtém o nome do grupo da rota
      };
    },
    mounted() {
      this.fetchSessions();
    },
    methods: {
      fetchSessions() {
        this.loading = true;
        this.errorMessage = '';
        axios.get(`http://localhost:8000/grupos/${this.groupName}/sessoes/em-andamento`)
          .then(response => {
            this.sessions = response.data.sessions;
          })
          .catch(error => {
            this.errorMessage = 'Erro ao buscar sessões em andamento.';
            console.error('Erro ao buscar sessões:', error.response ? error.response.data : error.message);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
      }
    }
  };
  </script>
  
  <style scoped>
  @import '../styles/OpenSessions.css';
  
  .open-sessions-wrapper {
    background: url("../assets/sessionsbg.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  
  .container {
    width: 1000px;
    height: 700px;
    min-height: 400px;
    padding: 30px;
    background-color: #1c1c1c;
    border: 2px solid rgb(0, 98, 255);
    border-radius: 10px;
    backdrop-filter: blur(15px);
  }
  
  h1 {
    color: #eee;
    text-align: center;
    margin-bottom: 36px;
  }
  
  .loading-message, .error-message, .empty-message {
    text-align: center;
    margin-top: 20px;
    color: #ffcc00;
  }
  
  .error-message {
    color: #ff4d4d;
  }
  
  .empty-message {
    color: #eee;
  }
  
  .sessions-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .session-item {
    background-color: #1c1c1c;
    border: 2px solid rgb(0, 98, 255);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .session-item h2 {
    color: #eee;
  }
  
  .session-item p {
    color: #bbb;
  }
  </style>
  