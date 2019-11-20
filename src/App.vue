<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.code{
  background: #1b1d23;
  color: rgb(175, 97, 97);
  margin: 20px auto 20px auto;
  padding: 15px;
  border-radius: 5px;
  text-align: left;
  word-wrap: break-word;
}
</style>
