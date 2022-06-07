<template>
  <el-row>
    <div class="header">
      <el-col :span="8" :offset="8">
        <span>核心网控制平台</span>
      </el-col>
      <el-col :span="1" :offset="4">
        <el-menu :default-active=activeIndex class="el-menu-demo" mode="horizontal" @select="handleSelect"
                 background-color="#2c3e50" text-color="#fff" :router="true"
                 active-text-color="#ffd04b">
          <el-menu-item index="1" route="/layout/home">系统首页</el-menu-item>
<!--          <el-menu-item index="2" route="/layout/nf">网元配置</el-menu-item>
          <el-menu-item index="3">用户配置</el-menu-item>-->
        </el-menu>
      </el-col>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      activeIndex:'1'
    }
  },
  methods:{
    handleSelect(key,keypath){
      console.log(key,keypath)
    }
  }
}
</script>

<style lang="less" scoped>

.header {
  width: 100%;
  height: 6vh;
  text-align: center;
  background-color: #2c3e50;
  padding-top: 2vh;
  padding-bottom: 1vh;
  span {
    font-size: 20px;
    color: white;
  }
  .el-menu-demo{
  }
}
</style>
