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
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
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
    ...mapState(['authToken']),
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
      const config = {
        headers: {
          Authorization: `${this.authToken}`
        }
      };

      axios.get('/grupos', config)
        .then(response => {
          if (Array.isArray(response.data.groups)) {
            this.groupsJson = response.data.groups;
          } else {
            this.groupsJson = [];
          }
          localStorage.setItem('groups', JSON.stringify(this.groupsJson));
          console.log(response.data)
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
    }
  }
};
</script>

<style scoped>
@import '../styles/MyGroups.css';
</style>
