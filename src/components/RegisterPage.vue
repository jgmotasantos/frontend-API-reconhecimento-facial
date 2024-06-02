<template>
  <div class="page-wrapper">
    <div class="login-wrapper">
      <form @submit.prevent="submitForm" class="text-white">
        <h1 class="text-center mb-4">Fazer meu Cadastro</h1>
        <div class="input-box">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Usuário" required v-model="username">
            <div class="input-group-append">
              <span class="input-group-text"><i class="bx bxs-user"></i></span>
            </div>
          </div>
        </div>
        <div class="input-box">
          <div class="input-group">
            <input type="email" class="form-control" placeholder="E-mail" required v-model="email">
            <div class="input-group-append">
              <span class="input-group-text"><i class="bx bxs-envelope"></i></span>
            </div>
          </div>
        </div>
        <div class="input-box">
          <div class="input-group">
            <input type="password" class="form-control" placeholder="Senha" required v-model="password">
            <div class="input-group-append">
              <span class="input-group-text"><i class="bx bxs-lock-alt"></i></span>
            </div>
          </div>
        </div>
        <div class="input-box">
          <div class="input-group">
            <input type="password" class="form-control" placeholder="Confirme sua senha" required v-model="confirmPassword">
            <div class="input-group-append">
              <span class="input-group-text"><i class="bx bxs-lock-alt"></i></span>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-light btn-block mt-3">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '../styles/RegisterPage.css';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    submitForm() {
      if (this.password !== this.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      const userData = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      axios.post('/auth/register', userData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          if (error.response) {
            console.error('Erro ao cadastrar usuário:', error.response.data);
          } else if (error.request) {
            console.error('Sem resposta do servidor:', error.request);
          } else {
            console.error('Erro ao configurar a requisição:', error.message);
          }
        });
    }
  }
};
</script>

<style scoped>
@import '../styles/RegisterPage.css';

.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('../assets/classbackgorund.jpg');
  background-size: cover;
}
</style>
