<template>
    <div>
      <mys-navbar :currentGroupName="currentGroupName"></mys-navbar>
      <div class="my-sessions-wrapper">
        <div class="container">
          <h1>Minhas Sessões</h1>
          <div v-if="sessionsJson.length === 0">
            <p class="no-sessions-message">Você ainda não possui nenhuma sessão.</p>
          </div>
          <div v-else class="sessions-container">
            <ul class="sessions">
              <li 
                v-for="(session, index) in sessionsJson" 
                :key="index" 
                class="session"
              >
                <span>{{ session.name }}</span>
                <div class="session-actions">
                  <button 
                    class="view-more-btn" 
                    @click="viewMore(session)"
                  >
                    Ver Mais
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import MysNavbar from './MysNavbar.vue';
  
  export default {
    name: 'MySessions',
    components: {
      'mys-navbar': MysNavbar,
    },
    data() {
      return {
        sessionsJson: [],
        currentGroupName: null
      };
    },
    mounted() {
      this.fetchSessions();
    },
    methods: {
      fetchSessions() {
        // A URL deve ser ajustada conforme a estrutura do seu back-end. 
        // Supondo que `currentGroupName` contém o nome do grupo:
        axios.get(`/grupos/${this.currentGroupName}/sessoes/encerradas`)
          .then(response => {
            if (Array.isArray(response.data.sessions)) {
              this.sessionsJson = response.data.sessions;
            } else {
              this.sessionsJson = [];
            }
            localStorage.setItem('sessions', JSON.stringify(this.sessionsJson));
            console.log(response.data);
          })
          .catch(error => {
            console.error('Erro ao buscar sessões:', error.response.data);
            this.sessionsJson = [];
          });
      },
      viewMore(session) {
        console.log('Sessão selecionada:', session.name);
        this.$router.push({ path: `/sessoes/${session.name}/detalhes` });
      }
    }
  };
  </script>
  
  <style scoped>
  @import '../styles/MySessions.css';
  
  .session-actions {
    display: flex;
    align-items: center;
  }
  
  .view-more-btn {
    margin-left: 10px;
    margin-right: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
  }
  
  .view-more-btn:hover {
    background-color: #0056b3;
  }
  
  .no-sessions-message {
    color: white;
  }
  </style>
  