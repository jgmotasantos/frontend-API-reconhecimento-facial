<template>
  <div>
    <members-navbar :groupName="groupName"></members-navbar>
    <div class="my-groups-wrapper">
      <div class="container">
        <h4>Detalhes do Grupo:</h4>
        <h1>{{ group.name }}</h1>
        <p class="group-created">Grupo criado em: {{ formatDate(group.createdAt) }}</p>
        <div class="members-list">
          <div v-for="(member, index) in group.members" :key="index" class="member">
            <img :src="getMemberPhoto(member.face)" :alt="member.name" class="member-photo">
            <div class="member-details">
              <span class="member-name">{{ member.name }}</span>
              <p class="member-date">Adicionado em: {{ formatDate(member.addedAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MembersNavbar from './MembersNavbar.vue';

export default {
  name: 'GroupDetails',
  components: {
    membersNavbar: MembersNavbar,
  },
  computed: {
    groupName() {
      return this.$route.params.nomeDoGrupo;
    }
  },
  data() {
    return {
      group: null,
      error: null,
    };
  },
  created() {
    this.fetchGroupDetails();
  },
  methods: {
    async fetchGroupDetails() {
      const nomeDoGrupo = this.$route.params.nomeDoGrupo;

      try {
        const response = await axios.get(`/grupos/${nomeDoGrupo}/detalhes`);
        this.group = response.data;
        console.log('Sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do grupo:', error.response ? error.response.data : error.message);
        this.error = 'Erro ao buscar os detalhes do grupo.';
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    },
    getMemberPhoto(faceBase64) {
      return `data:image/jpeg;base64,${faceBase64}`;
    }
  },
};
</script>

<style scoped>
@import '../styles/GroupDetails.css';

.group-created {
  margin-bottom: 20px; /* Adicionando margem inferior ao texto */
}

.members-list {
  max-height: 400px; /* Definindo a altura máxima da lista */
  overflow-y: auto; /* Adicionando barra de rolagem vertical */
}

.member {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid white;
  color: white;
}

.member-photo {
  width: 60px; /* Aumentando o tamanho da foto */
  height: 60px; /* Aumentando o tamanho da foto */
  border-radius: 50%;
  margin-right: 15px;
}

.member-details {
  display: flex;
  flex-direction: column;
}

.member-name {
  font-size: 1.2em; /* Aumentando o tamanho do nome */
  font-weight: bold; /* Deixando o nome em negrito */
}

.member-date {
  font-size: 1em; /* Aumentando o tamanho da data */
}

p {
  color: white;
}
</style>
