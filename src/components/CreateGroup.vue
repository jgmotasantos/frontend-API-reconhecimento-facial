<template>
    <div>
      <app-navbar></app-navbar>
      <div class="my-groups-wrapper">
        <logout-button class="logout-button"></logout-button>
        <div class="container">
          <h1>Criar Grupo</h1>
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
  import { mapState } from 'vuex';
  import AppNavbar from './AppNavbar.vue';
  import LogoutButton from './LogoutButton.vue';
  
  export default {
    name: 'CreateGroup',
    components: {
      AppNavbar,
      LogoutButton
    },
    data() {
      return {
        newGroupName: '',
        loading: false,
        successMessage: '',
        errorMessage: ''
      };
    },
    computed: {
      ...mapState(['authToken'])
    },
    methods: {
      addGroup() {
        if (this.newGroupName.trim() === '') return;
  
        this.loading = true;
        this.successMessage = '';
        this.errorMessage = '';
  
        const newGroup = { name: this.newGroupName };
        const config = {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        };
  
        axios.post('/grupos/criar', newGroup, config)
          .then(response => {
            this.newGroupName = '';
            this.successMessage = 'Grupo adicionado com sucesso!';
            this.$emit('group-added');
            console.log(response.data);
          })
          .catch(error => {
            if (error.response) {
              this.errorMessage = error.response.data.message || 'Erro ao adicionar grupo. Tente novamente.';
            } else {
              this.errorMessage = 'Erro ao adicionar grupo. Tente novamente.';
            }
          })
          .finally(() => {
            this.loading = false;
          });
      },
      getGroup() {
        const config = {
          headers: {
            Authorization: `${this.authToken}`
          }
        };
  
        axios.get('/grupos/criar', config)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Erro ao obter grupo:', error.response.data);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  @import '../styles/MyGroups.css';
  </style>
  