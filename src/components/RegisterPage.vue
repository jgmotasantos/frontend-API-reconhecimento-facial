<template>
    <div class="login-wrapper">
      <form @submit.prevent="submitForm">
        <h1>Fazer meu Cadastro</h1>
        <div class="input-box">
          <input type="text" placeholder="Usuário" required v-model="username">
          <i class="bx bxs-user"></i>
        </div>
        <div class="input-box">
          <input type="email" placeholder="e-mail" required v-model="username">
          <i class="bx bxs-user"></i>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Senha" required v-model="password">
          <i class="bx bxs-lock-alt"></i>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Confirme sua senha" required v-model="confirmPassword">
          <i class="bx bxs-lock-alt"></i>
        </div>
        <button type="submit" class="btn">Cadastrar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      submitForm() {
        console.log('Formulário enviado!');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Seus estilos aqui */
  .login-wrapper {
    width: 600px;
    background: transparent;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: rgb(241, 235, 235);
    border-radius: 10px;
    padding: 50px 40px;
    margin: 0 auto;
  }
  
  .login-wrapper h1 {
    font-size: 36px;
    text-align: center;
    margin-bottom: 20px; 
  }
  
  .login-wrapper .input-box {
    position: relative; 
    width: 100%;
    margin: 30px 0;
  }
  
  .login-wrapper .input-box input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    padding-left: 40px; 
    color: white; 
  }
  
  .login-wrapper .input-box input::placeholder {
    color: white;
  }
  
  .login-wrapper .input-box i {
    position: absolute;
    left: 10px; 
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: white; 
  }
  
  .login-wrapper .btn {
    width: 100%;
    height: 45px;
    background: white;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }
  </style>
  