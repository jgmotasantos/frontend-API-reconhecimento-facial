<template>
  <div class="login-wrapper">
    <form @submit.prevent="submitForm" class="text-white">
      <h1 class="text-center mb-4">Login</h1>
      <div class="input-box">
        <div class="input-group">
          <input type="email" class="form-control" placeholder="E-mail" required v-model="email" style="border-radius: 100px;">
          <div class="input-group-append">
            <span class="input-group-text"><i class="bx bxs-envelope"></i></span>
          </div>
        </div>
      </div>
      <div class="input-box">
        <div class="input-group">
          <input type="password" class="form-control" placeholder="Senha" required v-model="password" style="border-radius: 100px;">
          <div class="input-group-append">
            <span class="input-group-text"><i class="bx bxs-lock-alt"></i></span>
          </div>
        </div>
      </div>
      <div class="remember-forgot d-flex justify-content-between align-items-center">
        <label class="form-check-label"><input type="checkbox" class="form-check-input" v-model="rememberMe">Lembrar-se de mim</label>
        <a href="#" class="text-white">Esqueceu a senha?</a>
      </div>
      <button type="submit" class="btn btn-light btn-block mt-3" >Entrar</button>
      <div class="register-link text-center mt-3">
        <p>Ainda não possui uma conta?</p>
        <router-link to="/auth/register" class="text-" style="color: aqua;">Registrar</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

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
.login-wrapper {
  width: 600px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 20px;
  padding: 50px 40px;
  margin: 0 auto;
}

.login-wrapper h1 {
  font-size: 36px;
  text-align: center;
  margin-bottom: 30px;
  color: white;
}

.login-wrapper .input-box {
  position: relative;
  width: 100%;
  margin: 30px 0;
}

.login-wrapper .input-group {
  display: flex;
}

.login-wrapper .input-group input {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  color: white;
  padding: 10px 20px;
  flex: 1;
}

.login-wrapper .input-group input::placeholder {
  color: white;
}

.login-wrapper .input-group-text {
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
}

.login-wrapper .input-group-text i {
  color: white;
}

.login-wrapper .form-check-input {
  accent-color: white;
  margin-right: 3px;
}

.login-wrapper a {
  color: white;
}

.login-wrapper a:hover {
  text-decoration: underline;
}

.login-wrapper .btn {
  width: 100%;
  height: 45px;
  background: white;
  border: none;
  border-radius: 40px;
  color: #333;
  font-weight: 600;
}

.register-link p {
  color: white;
  margin-bottom: 10px;
}

.register-link a {
  color: white;
  text-decoration: none;
  background: none; /* Remove background */
  border: none;
  border-radius: 40px;
}

.register-link a:hover {
  text-decoration: underline;
  color: aqua
}
</style>
