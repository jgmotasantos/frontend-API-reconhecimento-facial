<template>
  <div>
    <members-navbar :groupName="groupName"></members-navbar>
    <div class="my-groups-wrapper">
      <div class="container">
        <div class="header">
          <h4 class="group-details-title">Detalhes do Grupo:</h4>
        </div>
        <h1>{{ group.name }}</h1>
        <p class="group-created">Grupo criado em: {{ formatDate(group.createdAt) }}</p>
        <button class="delete-all-btn" @click="confirmDeleteAllMembers">Deletar Todos os Membros</button>
        <div class="members-list">
          <div v-for="(member, index) in group.members" :key="index" class="member">
            <img :src="getMemberPhoto(member.face)" :alt="member.name" class="member-photo">
            <div class="member-details">
              <span class="member-name">{{ member.name }}</span>
              <p class="member-date">Adicionado em: {{ formatDate(member.addedAt) }}</p>
            </div>
            <div class="member-attendance-delete">
              <p class="member-attendance">Total de presenças: <span class="attendance-value">{{ member.totalAttendance }}</span></p>
              <button class="delete-member-btn" @click="confirmDeleteMember(member.name)">Deletar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Deseja realmente deletar {{ memberToDelete ? 'o membro ' + memberToDelete : 'todos os membros' }}?</h3>
        <div class="modal-buttons">
          <button class="confirm-btn" @click="deleteMember">Sim</button>
          <button class="cancel-btn" @click="closeModal">Não</button>
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
      showModal: false,
      memberToDelete: null
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
    },
    confirmDeleteMember(memberName) {
      this.memberToDelete = memberName;
      this.showModal = true;
    },
    confirmDeleteAllMembers() {
      this.memberToDelete = null;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.memberToDelete = null;
    },
    async deleteMember() {
      const nomeDoGrupo = this.$route.params.nomeDoGrupo;
      try {
        if (this.memberToDelete) {
          const response = await axios.delete(`/grupos/${nomeDoGrupo}/detalhes/${this.memberToDelete}/deletar`);
          console.log('Membro deletado com sucesso:', response.data);
        } else {
          const response = await axios.delete(`/grupos/${nomeDoGrupo}/detalhes/deletar-membros`);
          console.log('Todos os membros deletados com sucesso:', response.data);
        }
        this.fetchGroupDetails(); // Recarregar a lista de membros
        this.closeModal(); // Fechar o modal
      } catch (error) {
        console.error('Erro ao deletar o membro:', error.response ? error.response.data : error.message);
        this.error = 'Erro ao deletar o membro.';
      }
    }
  }
};
</script>

<style scoped>
@import '../styles/GroupDetails.css';

.group-created {
  margin-bottom: 20px; /* Adicionando margem inferior ao texto */
  color: white; /* Cor branca para o texto */
}

.members-list {
  max-height: 400px; /* Definindo a altura máxima da lista */
  overflow-y: auto; /* Adicionando barra de rolagem vertical */
}

.member {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Distribui os itens igualmente */
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
  flex-grow: 1; /* Permite que o conteúdo ocupe o espaço restante */
}

.member-name {
  font-size: 1.2em; /* Aumentando o tamanho do nome */
  font-weight: bold; /* Deixando o nome em negrito */
}

.member-date {
  font-size: 1em; /* Aumentando o tamanho da data */
}

.member-attendance {
  font-size: 1em; /* Tamanho da participação máxima */
  margin-left: 15px; /* Espaçamento à esquerda para separar do conteúdo */
  display: flex;
  align-items: center; /* Alinhamento vertical central */
}

.attendance-value {
  display: inline-block;
  width: 3ch; /* Largura suficiente para 3 caracteres */
  text-align: right; /* Alinhamento à direita */
}

.member-attendance-delete {
  display: flex;
  align-items: center;
  gap: 10px; /* Espaçamento entre presença e botão deletar */
}

.delete-member-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px; /* Reduzindo o tamanho do botão */
  cursor: pointer;
  border-radius: 5px;
}

.delete-member-btn:hover {
  background-color: #cc0000;
}

.delete-all-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 15px; /* Aumentando a altura do botão */
  cursor: pointer;
  border-radius: 5px;
  position: absolute; /* Posição absoluta */
  top: 10px; /* Distância do topo */
  right: 10px; /* Distância da direita */
}

.delete-all-btn:hover {
  background-color: #cc0000;
}

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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* Tornar o header relativo para posicionar o botão */
}

.group-details-title {
  text-align: center;
  flex-grow: 1;
}
</style>
