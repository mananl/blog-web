<template>
  <div class="menu">
    <ul>
      <li><router-link to="/">列表</router-link></li>
      <li><router-link to="add">新增</router-link></li>
      <li><router-link to="index">分类</router-link></li>
    </ul>
  </div>
</template>
<style scoped>
.menu {
  min-height: calc(100vh - 45px);
  background: #fff;
  color: #222;
  font-size: 14px;
  width: 150px;
  line-height: 40px;
  /* text-align: center; */
  padding-left: 20px;
  box-sizing: border-box;
}
li {
  cursor: pointer;
}
</style>
<script>
export default {
  name: "Menu"
};
</script>

