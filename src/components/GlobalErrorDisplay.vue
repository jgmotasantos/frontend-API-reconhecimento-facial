<template>
  <div v-if="visible" class="alert alert-danger alert-dismissible fade show global-error-display" role="alert">
    <strong>{{ errorType }}</strong> - {{ errorMessage }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      errorMessage: '',
      errorType: ''
    };
  },
  methods: {
    showError(error) {
      this.errorMessage = error.response?.data?.message || 'Ocorreu um erro ao tentar realizar a operação.';
      this.errorType = error.response?.data?.error || 'Erro desconhecido';
      this.visible = true;
      
      setTimeout(() => {
        this.hideError();
      }, 5000);
    },
    hideError() {
      this.visible = false;
      this.errorMessage = '';
      this.errorType = '';
    }
  }
};
</script>

<style scoped>
.global-error-display {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}
</style>