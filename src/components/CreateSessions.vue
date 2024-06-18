<template>
  <div>
    <app-navbar :groupName="groupName"></app-navbar>
    <div class="create-sessions-wrapper">
      <div class="container">
        <h1>Criar Sessão</h1>
        <div class="input-container">
          <input
            class="session-input"
            placeholder="Nome da Sessão"
            v-model="newSessionName"
            :disabled="loading"
          />
          <input
            class="session-input"
            placeholder="Valor da presença"
            v-model.number="maxAttendance"
            type="number"
            :disabled="loading"
          />
        </div>
        <button @click="addSession" :disabled="loading">Adicionar Sessão</button>
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
        .then(() => { // Removido 'response'
          this.successMessage = 'Sessão iniciada com sucesso.';
          this.newSessionName = '';
          this.maxAttendance = 0;
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
