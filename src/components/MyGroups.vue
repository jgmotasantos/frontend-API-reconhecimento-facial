<template>
  <div class="my-groups-wrapper">
    <div class="container">
      <h1>Meus Grupos</h1>
      <div class="input-container">
        <input class="group-input" placeholder="Adicionar novo grupo..." v-model="newGroupName" @keyup.enter="addGroup">
        <button class="add-button" @click="addGroup">
          <i class="fa fa-plus-circle"></i>
        </button>
      </div>
      <div class="input-container">
        <input class="filter-input" placeholder="Filtrar grupos..." v-model="filter">
      </div>
      <div class="actions">
        <button class="edit-selected" @click="editSelected">Editar Selecionados</button>
      </div>
      <div class="groups-container">
        <ul class="groups">
          <li v-for="(group, index) in filteredGroups" :key="index" class="group">
            <label :for="'group-' + index">
              <input :id="'group-' + index" type="checkbox" v-model="selectedGroups">
              <span>{{ group.name }}</span>
            </label>
            <button class="delete-btn" @click="removeGroup(index)"><i class="fa fa-times"></i></button>
          </li>
        </ul>
        <img class="empty-image" v-if="filteredGroups.length === 0">
      </div>
    </div>
   </div> 
</template>
<script>

export default {
  data() {
    return {
      newGroupName: '',
      filter: '',
      groupsJson: [],
      selectedGroups: []
    };
  },
  computed: {
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
      this.groupsJson.unshift({ name: this.newGroupName });
      localStorage.setItem('groups', JSON.stringify(this.groupsJson));
      this.newGroupName = '';
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
