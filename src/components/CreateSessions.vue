<template>
  <div>
    <CreastsNavbar :groupName="groupName"></CreastsNavbar>
    <div class="create-sessions-wrapper">
      <div class="container">
        <h1>Iniciar Sessão</h1>
        <p class="description">
          Quando uma sessão é iniciada, é liberado para o usuário capturar fotos da face das pessoas. <br>
        Caso a face capturada corresponda a de algum Membro da Sessão, ele é validado e recebe o valor de presença máximo,<br>
        definido no momento de criação da Sessão, que não pode ser excedido. <br>
        <br>
        Após encerrar a Sessão, é possível ver os dados que foram gerados nesse processo, e caso queira,<br>
        alterar o valor de presença de um Membro da Sessão. <br>
        <br>
          Obs: Membros da Sessão são compostos pelos Membros do Grupo presentes no momento de início da Sessão,<br>
          e isso não pode ser alterado. Caso algum Membro seja deletado ou adicionado no grupo após o início da Sessão,<br>
          essas alterações não serão feitas em Sessões que já foram iniciadas.
        </p>
        <div class="input-container">
          <label for="session-name">Nome desejado:</label>
          <input
            class="session-input"
            placeholder="Nome da Sessão"
            v-model="newSessionName"
            :disabled="loading"
          />
          <label for="attendance-value">Presença máxima:</label>
          <input
            class="session-input"
            placeholder="Valor da presença"
            v-model.number="maxAttendance"
            type="number"
            :disabled="loading"
          />
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
import CreastsNavbar from './CreateSessionNavbar.vue';

export default {
  name: 'CreateSessions',
  components: {
    CreastsNavbar,
  },
  data() {
    return {
      newSessionName: '',
      maxAttendance: 0,
      loading: false,
      successMessage: '',
      errorMessage: '',
      groupName: this.$route.params.nomeDoGrupo // Obtém o nome do grupo da rota
    };
  },
  methods: {
    addSession() {
      if (!this.newSessionName || !this.maxAttendance) {
        this.errorMessage = 'Todos os campos são obrigatórios.';
        return;
      }

      this.loading = true;
      this.errorMessage = '';

      const sessionData = {
        name: this.newSessionName,
        maxAttendance: this.maxAttendance
      };

      axios.post(`http://localhost:8080/grupos/${this.groupName}/sessoes/iniciar`, sessionData)
        .then(response => {
          this.successMessage = 'Sessão iniciada com sucesso.';
          this.newSessionName = '';
          this.maxAttendance = 0;
          console.log(response.data); // Logando a resposta do servidor no console
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

.container {
  width: 1000px;
  height: auto;
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

.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Adicionado para alinhar labels e inputs */
  margin-bottom: 25px;
}

.input-container label {
  color: #ffffff;
  margin-right: 10px; /* Adicionado para criar espaço entre label e input */
}

.session-input {
  flex: 1;
  outline: none;
  padding: 10px 10px 10px 20px;
  background-color: transparent;
  border: 2px solid rgb(0, 98, 255);
  border-radius: 30px;
  color: #eee;
  font-size: 16px;
  margin-right: 10px;
}

.session-input::placeholder {
  color: #ffffff;
}

.add-button {
  border: none;
  outline: none;
  background: rgb(0, 98, 255);
  color: #fff;
  font-size: 35px;
  cursor: pointer;
  border-radius: 40px;
  width: 40px;
  height: 40px;
}

.loading-message, .success-message, .error-message {
  text-align: center;
  color: #eee;
  margin-top: 20px;
}

.success-message {
  color: #00ff88a1;
}

.error-message {
  color: #ff0000;
}

.create-sessions-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url("../assets/sessionsbg.png");
  background-size: cover;
}

.description {
  color: #eee;
  text-align: center;
  margin-bottom: 20px;
}
</style>
