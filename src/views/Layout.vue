<template>
    <el-container class="container">
        <el-header height="10vh" style="padding-left:0;padding-right: 0;">
          <Header></Header>
        </el-header>
      <router-view/>
    </el-container>
</template>
<script>
import Header from "./Header"
export default {
  components:{Header},
  name:"Layout",
  data(){
    return{
    }
  },

}
</script>
<style lang="less">
.container {
  padding: 0;
  margin: 0;
  height: 100vh;
  background-color: #f8f8f8;
  }
</style>
