<template>
  <div>
    <app-navbar></app-navbar>
    <div class="my-groups-wrapper">
      <div class="container">
        <h1>Meus Grupos</h1>
        <div class="input-container">
          <input 
            class="filter-input" 
            placeholder="Filtrar grupos..." 
            v-model="filter"
          >
        </div>
        <div class="actions">
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
              <div class="group-actions">
                <button 
                  class="view-more-btn" 
                  @click="viewMore(group)"
                >
                  Ver Mais
                </button>
                <button 
                  class="delete-btn" 
                  @click="removeGroup(index)"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </li>
          </ul>
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
    appNavbar: AppNavbar,
  },
  data() {
    return {
      filter: '',
      groupsJson: [],
      selectedGroups: [],
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
    },
    viewMore(group) {
      console.log('Grupo selecionado:', group.name);
      this.$router.push({ path: `/grupos/${group.name}/detalhes` });
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

.view-more-btn {
  margin-left: 10px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}

.view-more-btn:hover {
  background-color: #0056b3;
}
</style>
