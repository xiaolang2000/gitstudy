<template>
  <div class="container">
    <el-row>
      <el-col :span="15" :offset="4">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" stretch>
          <el-tab-pane label="AMF" name="AMF"><Amfcard></Amfcard></el-tab-pane>
          <el-tab-pane label="SMF" name="SMF">SMF</el-tab-pane>
          <el-tab-pane label="UPF" name="UPF">UPF</el-tab-pane>
          <el-tab-pane label="NRF" name="NRF">NRF</el-tab-pane>
          <el-tab-pane label="PCF" name="PCF">PCF</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

  </div>
</template>

<script>
// @ is an alias to /src
// import Amfcard from "@/components/NF/children/Amf"


export default {
  name: 'Nfconfigure',
  components: {
  },
  data() {
    return {
      activeName: 'AMF',
    };
  },


}
</script>

<style lang="less">
.container {
  padding: 0;
  margin: 0;
  height: 125vh;
  background-color: #f8f8f8;

  .header {
    width: 100%;
    height: 6vh;
    text-align: center;
    background-color: #2c3e50;
    padding-top: 2vh;
    span {
      font-size: 20px;
      color: white;
    }
  }

}
</style>
