<template>
  <div id="app">
    <LoginForm/>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'

export default {
  components: {
    LoginForm
  }
}
</script>

<style>

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('./assets/ultraPurple.jpg');
  background-size: 140%;
  margin-left: 430px;
}
</style>
