<template>
  <div>
    <sd-navbar :groupName="groupName"></sd-navbar>
    <div class="session-details-wrapper">
      <div class="container">
        <h1>Detalhes da Sessão - {{ sessionName }}</h1>
        <div v-if="loading" class="loading-message">Carregando detalhes da sessão...</div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div v-if="session" class="session-info">
          <p class="session-date">Iniciada em: {{ formatDate(session.startedAt) }}</p>
          <p class="session-date">Encerrada em: {{ formatDate(session.endedAt) }}</p>
          <p class="session-max-attendance">Máximo de Presença possível: {{ session.maxAttendance }}</p>
          <h2 class="members-title">Membros:</h2>
          <div class="member-list">
            <ul class="members-list">
              <li v-for="member in session.members" :key="member.id" class="member-item">
                <div class="member-face-wrapper">
                  <img v-if="member.wasFaceValidated" :src="getFaceUrl(member.face)" alt="Face do Membro" class="member-face"/>
                  <div v-else class="member-face-placeholder"></div>
                </div>
                <div class="member-info">
                  <p>{{ member.name }}</p>
                  <p class="was-face-validated">
                    Face foi validada?
                    <span :class="{'validated': member.wasFaceValidated, 'not-validated': !member.wasFaceValidated}">
                      {{ member.wasFaceValidated ? 'Sim' : 'Não' }}
                    </span>
                  </p>
                  <p class="attendance">Presença: <span class="attendance-value">{{ member.attendance }}</span></p>
                  <button class="edit-btn" @click="confirmEditAttendance(member.name, member.attendance)">Editar Presença</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Qual o novo valor da presença de {{ memberToEdit }}?</h3>
        <input v-model="newAttendance" type="number" min="0" :max="session.maxAttendance" class="attendance-input"/>
        <div class="modal-buttons">
          <button class="confirm-btn" @click="updateAttendance">Salvar</button>
          <button class="cancel-btn" @click="closeModal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SdNavbar from './SessionDetailsNavbar.vue';

export default {
  name: 'SessionDetails',
  components: {
    SdNavbar,
  },
  data() {
    return {
      session: null,
      loading: false,
      errorMessage: '',
      groupName: this.$route.params.nomeDoGrupo,
      sessionName: this.$route.params.nomeDaSessao,
      showModal: false,
      memberToEdit: '',
      newAttendance: 0,
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
          console.log('Detalhes da sessão:', response.data); // Adicionando o log aqui
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
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    },
    getFaceUrl(face) {
      return `data:image/jpeg;base64,${face}`;
    },
    confirmEditAttendance(memberName, currentAttendance) {
      this.memberToEdit = memberName;
      this.newAttendance = currentAttendance;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.memberToEdit = '';
      this.newAttendance = 0;
    },
    updateAttendance() {
      const data = {
        attendance: this.newAttendance
      };
      axios.patch(`http://localhost:8080/grupos/${this.groupName}/sessoes/${this.sessionName}/detalhes/${this.memberToEdit}/editar-presenca`, data)
        .then(response => {
          console.log('Presença atualizada com sucesso:', response.data);
          this.fetchSessionDetails(); // Recarregar os detalhes da sessão
          this.closeModal(); // Fechar o modal
        })
        .catch(error => {
          this.errorMessage = 'Erro ao atualizar a presença.';
          console.error('Erro ao atualizar a presença:', error.response ? error.response.data : error.message);
        });
    }
  }
};
</script>

<style scoped>
@import '../styles/SessionDetails.css';

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
  height: 750px;
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

.session-date {
  margin-bottom: 10px;
}

.members-title {
  margin-top: 20px;
  margin-bottom: 10px;
}

.members-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.members-list li {
  background-color: #333;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.member-face-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.member-face {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.member-face-placeholder {
  width: 50px;
  height: 50px;
}

.member-info {
  display: flex;
  align-items: center;
  width: 100%;
}

.was-face-validated {
  margin-left: auto;
}

.attendance {
  margin-left: 20px;
}

.attendance-value {
  display: inline-block;
  width: 20px; /* Definindo largura mínima para dois dígitos */
  text-align: center; /* Centralizando o texto */
}

.validated {
  color: green;
}

.not-validated {
  color: red;
}

.edit-btn {
  background-color: #ffcc00;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
  margin-left: 10px;
}

.edit-btn:hover {
  background-color: #e6b800;
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

.attendance-input {
  width: 100px;
  padding: 5px;
  margin: 20px auto; /* Centralizar horizontalmente */
  border-radius: 5px;
  border: 1px solid #007bff;
  text-align: center;
  display: block; /* Necessário para margin auto funcionar corretamente */
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
