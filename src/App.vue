<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
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
