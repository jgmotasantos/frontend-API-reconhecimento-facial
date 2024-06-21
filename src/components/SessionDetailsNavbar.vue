<template>
    <header style="background-color: #1c1c1c; padding-bottom: 10px">
      <div class="navbar">
        <div class="logo"><router-link to="/home">Facial API.com</router-link></div>
        <ul class="links">
          <li><router-link :to="backToSessions">Voltar para Minhas Sessões</router-link></li>
        </ul>
        <logout-button class="logout-button"></logout-button>
        <div class="toggle-btn" @click="toggleMenu">
          <i class="fas fa-bars"></i>
        </div>
        <div class="dropdown-menu" :class="{ open: menuOpen }">
          <ul>
            <li><router-link to="/">Presença</router-link></li>
            <li><router-link to="/about">Sobre Nós</router-link></li>
            <li><router-link to="/services">Serviços</router-link></li>
            <li><router-link to="/contact">Contato</router-link></li>
            <li><router-link to="/grupos">Grupos</router-link></li>
            <li><router-link to="/grupos/criar">Criar Grupo</router-link></li>
          </ul>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  import LogoutButton from './LogoutButton.vue';
  
  export default {
    name: 'SessionDetailsNavbar',
    components: {
      'logout-button': LogoutButton
    },
    props: {
      groupName: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        menuOpen: false
      };
    },
    computed: {
      backToSessions() {
        return `/grupos/${this.groupName}/sessoes/encerradas`;
      }
    },
    methods: {
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      }
    }
  };
  </script>
  
  <style scoped>
  @import '../styles/SessionDetails.css';
  </style>
  