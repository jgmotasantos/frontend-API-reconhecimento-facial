<template>
  <div v-if="visible" class="alert alert-success" role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: ''
    };
  },
  methods: {
    showMessage(message) {
      this.message = message;
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 3000); // A mensagem desaparecerá após 3 segundos
    }
  }
};
</script>

<style>
.alert {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  padding: 10px 20px; /* Ajuste o padding conforme necessário */
  text-align: center;
  width: auto;
  display: inline-block;
}
</style>
