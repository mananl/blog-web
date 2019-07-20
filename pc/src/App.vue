<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->

    <!-- <el-header>
        后台管理中心
    </el-header>-->
    <Header></Header>
    <div class="main">
      <Menu></Menu>
      <div class="right-main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Menu from "./components/menu.vue";
export default {
  name: "App",
  components: {
    Header,
    Menu
  }
};
</script>
<style scoped>
  .main{
    display: flex;
  }
  .right-main{
    flex: 1;
    margin: 10px;
    box-sizing: border-box;
    background: #fff;
    padding: 20px;
    box-shadow:2px 2px 10px rgb(27, 25, 25,.4)
  }
</style>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
input,
textarea {
  outline: none;
  border: 1px solid #e1e1e1;
  padding: 5px;
}
.back {
  color: cornflowerblue;
}
</style>
