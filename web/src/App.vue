<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <!-- <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f4f4f5;
  min-height: 100vh;
}
html body {
    margin: 0;
    padding: 0;
}
input,textarea{
    outline: none;
    border: 1px solid #e1e1e1;
    padding: 5px;
}
.back{
  color: cornflowerblue;
}
.markdown-body ol, .markdown-body ul{
  padding-left: 0 !important;
}
.mint-toast{
  z-index: 100000 !important;
}
</style>
