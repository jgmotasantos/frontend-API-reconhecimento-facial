<template>
    <button @click="logout" class="btn btn-outline-secondary" style="background-color: #e6b7eca1; color: #fff;">Sair</button>
  </template>
  

  <script>
import axios from 'axios';

export default {
  methods: {
    async logout() {
      try {
        // Requisição para deslogar no backend. O cookie de autenticação será enviado automaticamente
        const response = await axios.post('/auth/logout');

        // Redirecionar para a página de login
        this.$router.push('/auth/login');

        // Exibir mensagem de sucesso, se necessário
        console.log('Logout realizado com sucesso:', response.data);

        // Manipular os dados do backend, se necessário
        // Por exemplo, se o backend enviar uma mensagem de sucesso
        const responseData = response.data;
        if (responseData.success) {
          alert(responseData.message); // Exibir mensagem de sucesso do backend
        }
      } catch (error) {
        // Se ocorrer um erro, imprimir a mensagem de erro do backend
        console.error('Erro ao fazer logout:', error.response ? error.response.data : error.message);
      }
    }
  }
};
</script>