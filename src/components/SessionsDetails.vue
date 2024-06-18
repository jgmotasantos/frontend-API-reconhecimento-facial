<template>
    <div>
      <sd-navbar :groupName="groupName"></sd-navbar>
      <div class="session-details-wrapper">
        <div class="container">
          <h1>{{ sessionName }}</h1>
          <h2>Detalhes da Sessão</h2>
          <div v-if="loading" class="loading-message">Carregando detalhes da sessão...</div>
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          <div v-if="session" class="session-info">
            <p>Iniciada em: {{ formatDate(session.startedAt) }}</p>
            <p>Encerrada em: {{ formatDate(session.endedAt) }}</p>
            <div v-if="session.members.length" class="members-list">
              <h3>Membros:</h3>
              <ul>
                <li v-for="member in session.members" :key="member.id">
                  {{ member.name }} - Presença: {{ member.attendance }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import SdNavbar from './SdNavbar.vue';
  
  export default {
    name: 'SessionsDetails',
    components: {
      'sd-navbar': SdNavbar,
    },
    data() {
      return {
        session: null,
        loading: false,
        errorMessage: '',
        groupName: this.$route.params.nomeDoGrupo,
        sessionName: this.$route.params.nomeDaSessao,
      };
    },
    mounted() {
      this.fetchSessionDetails();
    },
    methods: {
      fetchSessionDetails() {
        this.loading = true;
        this.errorMessage = '';
        axios.get(`http://localhost:8080/grupos/${this.groupName}/sessoes/${this.sessionName}/detalhes`)
          .then(response => {
            this.session = response.data;
          })
          .catch(error => {
            this.errorMessage = 'Erro ao buscar detalhes da sessão.';
            console.error('Erro ao buscar detalhes da sessão:', error.response ? error.response.data : error.message);
          })
          .finally(() => {
            this.loading = false;
          });
        },
        formatDate(dateString) {
          if (!dateString) return 'N/A';
          const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
          return new Date(dateString).toLocaleDateString('pt-BR', options);
        }
      }
    };
  </script>
  
  <style scoped>
  @import '../styles/SessionsDetails.css';
  
  .session-details-wrapper {
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
    overflow-y: auto;
  }
  
  h1 {
    color: #eee;
    text-align: center;
    margin-bottom: 36px;
  }
  
  h2 {
    color: #eee;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .loading-message, .error-message {
    text-align: center;
    margin-top: 20px;
    color: #ffcc00;
  }
  
  .error-message {
    color: #ff4d4d;
  }
  
  .session-info {
    color: #eee;
  }
  
  .members-list {
    margin-top: 20px;
  }
  
  .members-list h3 {
    margin-bottom: 10px;
  }
  
  .members-list ul {
    list-style: none;
    padding: 0;
  }
  
  .members-list li {
    background-color: #333;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
  }
  </style>
  