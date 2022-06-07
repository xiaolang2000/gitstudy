<template>
  <!--  <el-card class="box-card"  shadow="hover">-->
  <div>
    <el-row>
      <el-col class="el-col-1" :offset="1">
        <span style="color: mediumturquoise;font-size: 20px">{{this.nfName}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>配置信息如下：</span>
      </el-col>
    </el-row>

    <el-form :label-position="labelPosition1" label-width="100px" ref="form" size="mini" :model="form">

      <el-row>
        <el-col :offset="6">
          <el-descriptions title="NRF SBI"></el-descriptions>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8" :offset="6">
          <el-form-item label="Address">
            <el-input v-model="form.nrf.sbi.addr[0]" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Port">
            <el-input v-model="form.nrf.sbi.port" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>


    <el-row>
      <el-col :span="5" :offset="10">
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-col>
      <el-col :span="5">
        <el-button @click="onCancel">取消</el-button>
      </el-col>
    </el-row>
  </div>


</template>

<script>
export default {
  name: "Nrfcard",
  props:{
    son_visible:"false",
    form:"",
    userID: "",
    nfName: "",
    saveFlag:false
  },
  data() {
    return {
      labelPosition1: 'right',
      labelPosition2: 'top',

    }
  },
  methods: {
    onCancel(){
      this.$emit("update:innerVisible",false)
    },
    onSubmit() {
      this.$emit("update:form",this.form)
      this.$emit("update:saveFlag",true)
      this.$emit("update:innerVisible",false)

    }
  }
}
</script>


<style scoped lang="less">
.box-card {
  margin: 0 2vh 1vh 2vh;
  height: 200vh;
  border-radius: 16px;
}

.el-col-1 {
  height: 8vh;
}
</style>



