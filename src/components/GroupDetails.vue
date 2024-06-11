<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body">
        <div v-if="group">
          <h1 class="card-title">{{ group.name }}</h1> <!-- Título do grupo -->
          <p class="card-text"><strong>Criado em:</strong> {{ formatDate(group.createdAt) }}</p>
          <!-- Future implementation for members -->
          <!-- <div v-if="group.members">
            <h2>Membros</h2>
            <ul>
              <li v-for="member in group.members" :key="member.id">{{ member.name }}</li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GroupDetails',
  computed: {
    groupName() {
      return this.$route.params.nomeDoGrupo;
    }
  },
  data() {
    return {
      group: null,
      responseData: null,
      error: null,
    };
  },
  created() {
    this.fetchGroupDetails();
  },
  methods: {
    async fetchGroupDetails() {
      const authToken = localStorage.getItem('authToken'); // Obtém o authToken do local storage
      const nomeDoGrupo = this.$route.params.nomeDoGrupo;

      try {
        const response = await axios.get(`/grupos/${nomeDoGrupo}`, {
          headers: {
            Authorization: `${authToken}`
          }
        });
        this.group = response.data;
        console.log('Sucesso:', response.data); // Log da resposta da API
      } catch (error) {
        console.error('Erro ao buscar os detalhes do grupo:', error.response ? error.response.data : error.message);
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    },
  },
};
</script>
