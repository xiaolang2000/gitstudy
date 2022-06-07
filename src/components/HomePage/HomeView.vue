<template>
  <div class="container">
    <el-row>
      <el-col :span="14">
        <TopoGraph></TopoGraph>
      </el-col>
      <el-col :span="10">
        <UserList></UserList>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <ControlPanel></ControlPanel>
      </el-col>
      <el-col :span="10">
        <EchartsView></EchartsView>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import ControlPanel from "@/components/HomePage/children/ControlPanel"
import EchartsView from "@/components/HomePage/children/EchartsView"
import TopoGraph from "@/components/HomePage/children/TopoGraph";
import UserList from "@/components/HomePage/children/UserList";

export default {
  name: 'HomeView',
  components: {
    ControlPanel, EchartsView, TopoGraph, UserList
  },
  data() {
    return {
      nfList:[],
      flag:false,
    }
  },
  mounted() {
  },
  methods:{

  },
  watch:{

  }

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
