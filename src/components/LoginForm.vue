<template>
  <div class="page-wrapper">
    <div class="login-wrapper">
      <form @submit.prevent="submitForm" class="text-white">
        <h1 class="text-center mb-4">Login</h1>
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
        <div class="remember-forgot d-flex justify-content-between align-items-center">
          <label class="form-check-label"><input type="checkbox" class="form-check-input" v-model="rememberMe"> Lembrar-se de mim</label>
          <a href="#" class="text-white">Esqueceu a senha?</a>
        </div>
        <button type="submit" class="btn btn-light btn-block mt-3">Entrar</button>
        <div class="register-link text-center mt-3">
          <p>Ainda não possui uma conta?</p>
          <router-link to="/auth/register" class="text-" style="color: aqua;">Registrar</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '../styles/LoginForm.css';

export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('/auth/login', {
          email: this.email,
          password: this.password
        });
        
        console.log('Sucesso:', response.data);
        this.$router.push('/my-groups'); // Redirecionar após o sucesso
      } catch (error) {
        let errorMessage = 'Erro ao realizar login.';
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data;
        }
        console.error('Erro:', errorMessage);
      }
    }
  }
}
</script>

<style scoped>
@import '../styles/LoginForm.css';

.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('../assets/ultraPurple.jpg');
  background-size: cover;
}
</style>
