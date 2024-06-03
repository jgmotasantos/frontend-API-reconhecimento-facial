<template>
  <header style="background-color: #1c1c1c; padding-bottom: 10px">
  <div class="navbar">
    <div class="logo"><router-link to="/home">Facial API.com</router-link></div>
      <ul class="links">
        <li><router-link to="/">Presença</router-link></li>
        <li><router-link to="/about">Sobre Nós</router-link></li>
        <li><router-link to="/services">Serviços</router-link></li>
        <li><router-link to="/contact">Contato</router-link></li>
      </ul>
    <router-link to = '/auth/login' class="action-btn">Começar Agora</router-link>
    <div class="toggle-btn" @click="toggleMenu">
      <i class="fas fa-bars"></i>
    </div>
    <div class="dropdown-menu" :class="{ open: menuOpen }">
      <ul>
        <li><router-link to="/">Presença</router-link></li>
        <li><router-link to="/about">Sobre Nós</router-link></li>
        <li><router-link to="/services">Serviços</router-link></li>
        <li><router-link to="/contact">Contato</router-link></li>
         <li><router-link to="/auth/login" class="action-btn">Começar Agora</router-link></li>
      </ul>
    </div>
  </div>
  </header>
  <main>
    <div class="my-groups-wrapper">   
    <logout-button class="logout-button"></logout-button>
    <div class="container">
      <h1>Meus Grupos</h1>
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
      <div class="input-container">
        <input 
          class="filter-input" 
          placeholder="Filtrar grupos..." 
          v-model="filter"
        >
      </div>
      <div class="actions">
        <button 
          class="edit-selected" 
          @click="editSelected"
        >
          Editar Selecionados
        </button>
      </div>
      <div class="groups-container">
        <ul class="groups">
          <li 
            v-for="(group, index) in filteredGroups" 
            :key="index" 
            class="group"
          >
            <label :for="'group-' + index">
              <input 
                :id="'group-' + index" 
                type="checkbox" 
                v-model="selectedGroups"
              >
              <span>{{ group.name }}</span>
            </label>
            <button 
              class="delete-btn" 
              @click="removeGroup(index)"
            >
              <i class="fa fa-times"></i>
            </button>
          </li>
        </ul>
        <img 
          class="empty-image" 
          v-if="filteredGroups.length === 0"
        >
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
  </main>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import LogoutButton from './LogoutButton.vue'; 

export default {
  components: {
    'logout-button': LogoutButton // Registrando o componente LogoutButton
  },
  data() {
    return {
      newGroupName: '',
      filter: '',
      groupsJson: [],
      selectedGroups: [],
      loading: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  computed: {
    ...mapState(['authToken']),
    filteredGroups() {
      return this.groupsJson.filter(group => group.name.toLowerCase().includes(this.filter.toLowerCase()));
    }
  },
  mounted() {
    this.groupsJson = JSON.parse(localStorage.getItem('groups')) || [];
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
          Authorization: `${this.authToken}` // Use o token do Vuex
        }
      };

      axios.post('/grupos', newGroup, config)
        .then(response => {
          console.log('Resposta de sucesso:', response.data);
          // Adicionar o novo grupo à lista local se a requisição for bem-sucedida
          this.groupsJson.unshift(newGroup);
          localStorage.setItem('groups', JSON.stringify(this.groupsJson));
          this.newGroupName = '';
          this.successMessage = 'Grupo adicionado com sucesso!';
        })
        .catch(error => {
          if (error.response) {
            // O servidor respondeu com um status diferente de 2xx
            console.error('Erro ao adicionar grupo:', error.response.data);
            this.errorMessage = error.response.data.message || 'Erro ao adicionar grupo. Tente novamente.';
          } else if (error.request) {
            // A requisição foi feita mas nenhuma resposta foi recebida
            console.error('Erro ao adicionar grupo: Nenhuma resposta recebida');
            this.errorMessage = 'Nenhuma resposta do servidor. Tente novamente.';
          } else {
            // Alguma outra situação ocorreu ao configurar a requisição
            console.error('Erro ao adicionar grupo:', error.message);
            this.errorMessage = 'Erro ao adicionar grupo. Tente novamente.';
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    removeGroup(index) {
      this.groupsJson.splice(index, 1);
      localStorage.setItem('groups', JSON.stringify(this.groupsJson));
    },
    editSelected() {
      if (this.selectedGroups.length === 0) return;
      const newGroupName = prompt('Digite o novo nome para o grupo selecionado:', this.selectedGroups[0].name);
      if (newGroupName && newGroupName.trim() !== '') {
        this.selectedGroups.forEach(group => {
          const groupIndex = this.groupsJson.findIndex(g => g.name === group.name);
          this.$set(this.groupsJson, groupIndex, { name: newGroupName.trim() });
        });
        localStorage.setItem('groups', JSON.stringify(this.groupsJson));
      }
    }
  }
};
</script>

<style scoped>
@import '../styles/MyGroups.css';
@import '../styles/HomePage.css';

.logout-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
