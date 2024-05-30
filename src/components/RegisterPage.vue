<template>
  <div class="login-wrapper">
    <form @submit.prevent="submitForm" class="text-white">
      <h1 class="text-center mb-4">Fazer meu Cadastro</h1>
      <div class="input-box">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Usuário" required v-model="username" style="border-radius: 100px;">
          <div class="input-group-append">
            <span class="input-group-text"><i class="bx bxs-user"></i></span>
          </div>
        </div>
      </div>
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
      <div class="input-box">
        <div class="input-group">
          <input type="password" class="form-control" placeholder="Confirme sua senha" required v-model="confirmPassword" style="border-radius: 100px;">
          <div class="input-group-append">
            <span class="input-group-text"><i class="bx bxs-lock-alt"></i></span>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-light btn-block mt-3" >Cadastrar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

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

.login-wrapper .input-group input {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  color: white;
}

.login-wrapper .input-group input::placeholder {
  color: white;
}

.login-wrapper .input-group-text {
  background: transparent;
  border: none;
}

.login-wrapper .input-group-text i {
  color: white;
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
</style>

