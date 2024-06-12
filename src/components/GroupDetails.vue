<template>
  <div>
    <members-navbar></members-navbar>
    <div class="my-groups-wrapper">
      <div class="container">
        <h1>{{ group.name }}</h1>
        <p>Criado em: {{ formatDate(group.created_at) }}</p>
        <div class="members-list">
          <div v-for="(member, index) in group.members" :key="index" class="member">
            <img :src="member.photo_url" :alt="member.name" class="member-photo">
            <span>{{ member.name }}</span>
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
      const authToken = localStorage.getItem('authToken');
      const nomeDoGrupo = this.$route.params.nomeDoGrupo;

      try {
        const response = await axios.get(`/grupos/${nomeDoGrupo}/detalhes`, {
          headers: {
            Authorization: `${authToken}`
          }
        });
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
  },
};
</script>

<style scoped>
@import '../styles/MyGroups.css';

.member {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.member-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
