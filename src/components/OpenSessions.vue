<template>
  <div>
    <os-navbar :groupName="groupName"></os-navbar>
    <div class="open-sessions-wrapper">
      <div class="container">
        <h1>Sessões em Andamento</h1>
        <div v-if="loading" class="loading-message">Carregando sessões...</div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div v-if="sessions.length === 0 && !loading" class="empty-message">Nenhuma sessão em andamento.</div>
        <div v-if="sessions.length > 0" class="sessions-list">
          <div v-for="session in sessions" :key="session.id" class="session-item">
            <div class="session-info">
              <h2>{{ session.name }}</h2>
            </div>
            <button class="view-more-btn" @click="validateFaces(session.name)">Validar Faces</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import OsNavbar from './OpenSessionsNavbar.vue';

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
      axios.get(`http://localhost:8080/grupos/${this.groupName}/sessoes/em-andamento`)
        .then(response => {
          this.sessions = response.data.sessions;
          console.log('Sessões em andamento:', response.data); // Adicionando o log aqui
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
    },
    validateFaces(sessionName) {
      this.$router.push({ path: `/grupos/${this.groupName}/sessoes/${sessionName}/validar-face` });
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
  overflow-y: auto; /* Adicionando barra de rolagem */
}

/* Estilos para a barra de rolagem */
.container::-webkit-scrollbar {
  width: 6px;
}

.container::-webkit-scrollbar-track {
  background: #1c1c1c; /* Cor do fundo da barra de rolagem */
  border-radius: 10px;
}

.container::-webkit-scrollbar-thumb {
  background-color: rgb(0, 98, 255); /* Cor do polegar da barra de rolagem */
  border-radius: 10px;
  border: 1px solid #1c1c1c; /* Remover o fundo branco */
}

.container::-webkit-scrollbar-thumb:hover {
  background-color: #0056b3; /* Cor do polegar da barra de rolagem quando em hover */
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
  max-height: 500px; /* Altura máxima da lista */
  overflow-y: auto; /* Barra de rolagem vertical */
}

.session-item {
  background-color: #1c1c1c;
  border: 2px solid rgb(0, 98, 255);
  border-radius: 10px;
  padding: 10px; /* Diminuindo o padding */
  margin-bottom: 10px; /* Diminuindo a margem */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.session-info {
  display: flex;
  flex-direction: column;
}

.session-item h2 {
  color: #eee;
  font-size: 1.2em; /* Diminuindo o tamanho da fonte */
  margin: 0;
}

.session-item p {
  color: #bbb;
  font-size: 0.9em; /* Diminuindo o tamanho da fonte */
  margin: 0;
}

.view-more-btn {
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
</style>
