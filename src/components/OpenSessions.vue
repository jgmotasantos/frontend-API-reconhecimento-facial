<template>
  <div>
    <os-navbar :groupName="groupName"></os-navbar>
    <div class="open-sessions-wrapper">
      <div class="container">
        <h1>Sessões em Andamento</h1>
        <div class="actions">
          <button class="delete-all-btn" @click="confirmDeleteAll">Deletar Todas</button>
        </div>
        <div v-if="loading" class="loading-message">Carregando sessões...</div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div v-if="sessions.length === 0 && !loading && !errorMessage" class="empty-message">Nenhuma sessão em andamento.</div>
        <div v-if="sessions.length > 0 && !loading && !errorMessage" class="sessions-list">
          <div v-for="session in sessions" :key="session.id" class="session-item">
            <div class="session-info">
              <h2>{{ session.name }}</h2>
            </div>
            <div class="session-actions">
              <button class="delete-btn" @click="confirmDelete(session.name)">Deletar</button>
              <button class="view-more-btn" @click="validateFaces(session.name)">Validar Faces</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Deseja realmente deletar a sessão "{{ sessionToDelete }}"?</h3>
        <div class="modal-buttons">
          <button class="confirm-btn" @click="deleteSessionConfirmed">Sim</button>
          <button class="cancel-btn" @click="closeModal">Não</button>
        </div>
      </div>
    </div>

    <div v-if="showModalDeleteAll" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModalDeleteAll">&times;</span>
        <h3>Deseja realmente deletar todas as sessões em andamento?</h3>
        <div class="modal-buttons">
          <button class="confirm-btn" @click="deleteAllSessionsConfirmed">Sim</button>
          <button class="cancel-btn" @click="closeModalDeleteAll">Não</button>
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
      groupName: this.$route.params.nomeDoGrupo,
      showModal: false,
      showModalDeleteAll: false,
      sessionToDelete: ''
    };
  },
  mounted() {
    this.fetchSessions();
  },
  methods: {
    fetchSessions() {
      this.loading = true;
      this.errorMessage = '';
      axios.get(`http://localhost:8080/grupos/${encodeURIComponent(this.groupName)}/sessoes/em-andamento`)
        .then(response => {
          this.sessions = response.data.sessions;
          console.log('Sessões em andamento:', response.data);
        })
        .catch(error => {
          this.errorMessage = 'Erro ao buscar sessões em andamento.';
          console.error('Erro ao buscar sessões:', error.response ? error.response.data : error.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    validateFaces(sessionName) {
      this.$router.push({ path: `/grupos/${encodeURIComponent(this.groupName)}/sessoes/${encodeURIComponent(sessionName)}/validar-face` });
    },
    confirmDelete(sessionName) {
      this.sessionToDelete = sessionName;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.sessionToDelete = '';
    },
    deleteSessionConfirmed() {
      const encodedSessionName = encodeURIComponent(this.sessionToDelete);
      axios.delete(`http://localhost:8080/grupos/${encodeURIComponent(this.groupName)}/sessoes/${encodedSessionName}/deletar`)
        .then(response => {
          console.log('Sessão deletada com sucesso:', response.data);
          this.fetchSessions();
          this.closeModal();
        })
        .catch(error => {
          this.errorMessage = 'Erro ao deletar a sessão.';
          console.error('Erro ao deletar a sessão:', error.response ? error.response.data : error.message);
        });
    },
    confirmDeleteAll() {
      this.showModalDeleteAll = true;
    },
    closeModalDeleteAll() {
      this.showModalDeleteAll = false;
    },
    deleteAllSessionsConfirmed() {
      axios.delete(`http://localhost:8080/grupos/${encodeURIComponent(this.groupName)}/sessoes/em-andamento/deletar-todas`)
        .then(response => {
          console.log('Todas as sessões em andamento foram deletadas:', response.data);
          this.fetchSessions();
          this.closeModalDeleteAll();
        })
        .catch(error => {
          this.errorMessage = 'Erro ao deletar todas as sessões.';
          console.error('Erro ao deletar todas as sessões:', error.response ? error.response.data : error.message);
        });
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
  width: 900px;
  height: 700px;
  min-height: 400px;
  padding: 30px;
  background-color: #1c1c1c;
  border: 2px solid rgb(0, 98, 255);
  border-radius: 10px;
  backdrop-filter: blur(15px);
  overflow-y: auto;
}

/* Estilos para a barra de rolagem */
.container::-webkit-scrollbar {
  width: 6px;
}

.container::-webkit-scrollbar-track {
  background: #1c1c1c;
  border-radius: 10px;
}

.container::-webkit-scrollbar-thumb {
  background-color: rgb(0, 98, 255);
  border-radius: 10px;
  border: 1px solid #1c1c1c;
}

.container::-webkit-scrollbar-thumb:hover {
  background-color: #0056b3;
}

h1 {
  color: #eee;
  text-align: center;
  margin-bottom: 36px;
}

.actions {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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
  max-height: 500px;
  overflow-y: auto;
}

.session-item {
  background-color: #1c1c1c;
  border: 2px solid rgb(0, 98, 255);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
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
  font-size: 1.2em;
  margin: 0;
}

.session-item p {
  color: #bbb;
  font-size: 0.9em;
  margin: 0;
}

.session-actions {
  display: flex;
  gap: 10px;
}

.view-more-btn, .delete-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}

.delete-btn {
  background-color: #ff4d4d;
}

.view-more-btn:hover {
  background-color: #0056b3;
}

.delete-btn:hover {
  background-color: #cc0000;
}

.delete-all-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.delete-all-btn:hover {
  background-color: #cc0000;
}

/* Estilos para o modal */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #1c1c1c;
  border: 2px solid rgb(0, 98, 255);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 60%;
  max-width: 800px;
}

.modal-content h3 {
  color: #fff;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
}

.confirm-btn, .cancel-btn { 
  padding: 10px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px;
}

.confirm-btn:hover, .cancel-btn:hover {
  background-color: #000;
}

.confirm-btn {
  background-color: #ff4d4d;
}

.cancel-btn {
  background-color: #007bff;
}
</style>
