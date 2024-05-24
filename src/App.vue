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
  background: url('./assets/background.jpg');
  margin: 0;
}
</style>
