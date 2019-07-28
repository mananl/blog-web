<style scoped>
.header-box {
  display: flex;
  justify-content: flex-start;
  padding: 10px 20px;
  align-items: center;
  background: #272424;
  color: #fff;
}
.header-box img {
  width: 25px;
  height: 25px;
  border-radius: 25px;
  margin-right: 20px;
}
</style>
<template>
    <div class="header-box">
      <img src="../assets/pic.jpg" alt='头像'>
      <p class="intro">公路_陷阱</p>
    </div>
</template>
<script>
export default {
    name:'Head'
}
</script>

