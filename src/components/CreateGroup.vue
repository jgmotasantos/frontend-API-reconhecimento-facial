<template>
  <div>
    <app-navbar></app-navbar>
    <div class="my-groups-wrapper">
      <div class="container">
        <h1>Criar Grupo</h1>
        <p class="description">
          Grupos contém diversos Membros, que são as pessoas que você pretende monitorar a presença. <br>
          <br>
          Dentro de um Grupo, podem ser criadas várias Sessões, <br>
          que, por sua vez, são intervalos de tempo em que as fotos são tiradas para verificar presenças. <br>
          <br>
          Grupos não podem ter nomes repetidos.
        </p>
        <div class="input-container">
          <input 
            class="group-input" 
            placeholder="Adicionar novo grupo..." 
            v-model="newGroupName" 
            @keyup.enter="addGroup" 
            :disabled="loading"
          >
          <button 
            class="add-button" 
            @click="addGroup" 
            :disabled="loading"
          >
            <i class="fa fa-plus-circle"></i>
          </button>
        </div>
        <div v-if="loading" class="loading-message">
          Adicionando grupo...
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
  name: 'CreateGroup',
  components: {
    AppNavbar,
  },
  data() {
    return {
      newGroupName: '',
      loading: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    addGroup() {
      if (this.newGroupName.trim() === '') return;

      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      const newGroup = { name: this.newGroupName };

      axios.post('/grupos/criar', newGroup)
        .then(response => {
          this.newGroupName = '';
          this.successMessage = 'Grupo adicionado com sucesso!';
          this.$emit('group-added');
          console.log(response.data);
        })
        .catch(error => {
          this.errorMessage = 'Erro ao adicionar grupo. Tente novamente.';
          console.log(error.response.data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchData() {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      axios.get('/grupos/criar')
        .then(response => {
          console.log('Dados obtidos:', response.data);
        })
        .catch(error => {
          if (error.response) {
            this.errorMessage = 'Erro de autenticação. Tente novamente.';
            console.log('Erro de autenticação:', error.response.data);
          } else {
            this.errorMessage = 'Erro ao obter dados. Tente novamente.';
            console.log('Erro:', error.message);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
@import '../styles/MyGroups.css';

.description {
  color: #eee;
  text-align: center;
  margin-bottom: 20px;
}

.success-message {
  color: green;
  text-align: center;
  margin-top: 20px;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}
</style>
