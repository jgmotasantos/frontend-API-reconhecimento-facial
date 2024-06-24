<template>
  <div>
    <app-navbar :currentGroupName="currentGroupName"></app-navbar>
    <div class="my-groups-wrapper">
      <div class="container-with-filter">
        <h1>Meus Grupos</h1>
        <div class="input-container">
          <input 
            class="filter-input" 
            placeholder="Filtrar grupos..." 
            v-model="filter"
          >
        </div>
        <div class="actions">
          <button class="delete-all-btn" @click="confirmDeleteAll">Excluir Todos os Grupos</button>
        </div>
        <div class="groups-container">
          <ul class="groups">
            <li 
              v-for="(group, index) in filteredGroups" 
              :key="index" 
              class="group"
            >
              <span>{{ group.name }}</span>
              <div class="group-actions">
                <button 
                  class="delete-btn" 
                  @click="confirmDeleteGroup(group.name)"
                >
                  Excluir
                </button>
                <button 
                  class="view-more-btn" 
                  @click="viewMore(group)"
                >
                  Ver Mais
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modal para confirmação de exclusão de um grupo -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Deseja realmente deletar o grupo "{{ groupToDelete }}"?</h3>
        <div class="modal-buttons">
          <button class="confirm-btn" @click="deleteGroup">Sim</button>
          <button class="cancel-btn" @click="closeModal">Não</button>
        </div>
      </div>
    </div>

    <!-- Modal para confirmação de exclusão de todos os grupos -->
    <div v-if="showModalDeleteAll" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModalDeleteAll">&times;</span>
        <h3>Deseja realmente deletar todos os grupos?</h3>
        <div class="modal-buttons">
          <button class="confirm-btn" @click="deleteAllGroups">Sim</button>
          <button class="cancel-btn" @click="closeModalDeleteAll">Não</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppNavbar from './AppNavbar.vue';

export default {
  name: 'MyGroups',
  components: {
    'app-navbar': AppNavbar,
  },
  data() {
    return {
      filter: '',
      groupsJson: [],
      selectedGroups: [],
      currentGroupName: null,
      showModal: false,
      showModalDeleteAll: false,
      groupToDelete: '',
    };
  },
  computed: {
    filteredGroups() {
      if (Array.isArray(this.groupsJson)) {
        return this.groupsJson.filter(group => group.name.toLowerCase().includes(this.filter.toLowerCase()));
      }
      return [];
    }
  },
  mounted() {
    this.fetchGroups();
  },
  methods: {
    fetchGroups() {
      axios.get('/grupos')
        .then(response => {
          if (Array.isArray(response.data.groups)) {
            this.groupsJson = response.data.groups;
          } else {
            this.groupsJson = [];
          }
          localStorage.setItem('groups', JSON.stringify(this.groupsJson));
          console.log(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar grupos:', error.response.data);
          this.groupsJson = [];
        });
    },
    viewMore(group) {
      console.log('Grupo selecionado:', group.name);
      this.currentGroupName = group.name;
      this.$router.push({ path: `/grupos/${group.name}/detalhes` });
    },
    confirmDeleteGroup(groupName) {
      this.groupToDelete = groupName;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.groupToDelete = '';
    },
    deleteGroup() {
      axios.delete(`/grupos/${this.groupToDelete}/deletar`)
        .then(() => {
          this.fetchGroups();
          this.closeModal();
        })
        .catch(error => {
          console.error('Erro ao deletar o grupo:', error.response.data);
        });
    },
    confirmDeleteAll() {
      this.showModalDeleteAll = true;
    },
    closeModalDeleteAll() {
      this.showModalDeleteAll = false;
    },
    deleteAllGroups() {
      axios.delete(`/grupos/deletar`)
        .then(() => {
          this.fetchGroups();
          this.closeModalDeleteAll();
        })
        .catch(error => {
          console.error('Erro ao deletar todos os grupos:', error.response.data);
        });
    }
  }
};
</script>

<style scoped>
@import '../styles/MyGroups.css';

.group-actions {
  display: flex;
  align-items: center;
}

.view-more-btn, .delete-btn, .delete-all-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
  margin-left: 10px;
}

.delete-btn {
  background-color: #ff4d4d;
}

.view-more-btn:hover {
  background-color: #0056b3;
}

.delete-btn:hover {
  background-color: #cc0000;
}

.delete-all-btn {
  background-color: #ff4d4d;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.delete-all-btn:hover {
  background-color: #cc0000;
}

/* Estilos para o modal */
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
</style>
