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

    <el-form :label-position="labelPosition1" label-width="160px" ref="form" size="mini" :model="form">
      <el-row >
        <el-col :span="9" :offset="5">
          <el-form-item label="PFCP Address(IPv4)">
            <el-input v-model="form.upf.pfcp[0].addr" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="Subnet Address(IPv4)">
            <el-input v-model="form.upf.subnet[0].addr" style="width: 50%;"></el-input>
          </el-form-item>

        </el-col>

        <el-col :span="8">
          <el-form-item label="GTP-U Address(IPv4)">
            <el-input v-model="form.upf.gtpu[0].addr" style="width: 70%;"></el-input>
          </el-form-item>
          <el-form-item label="Subnet Address(IPv6)">
            <el-input v-model="form.upf.subnet[1].addr" style="width: 70%;"></el-input>
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
  name: "Upfcard",
  props:{
    son_visible:"false",
    form:"",
    userID: "",
  },
  data() {
    return {
      labelPosition1: 'right',
      labelPosition2: 'top',
      nfName: "UPF",
    }
  },
  methods: {
    onCancel(){
      this.$emit("update:son_visible",false)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    onSubmit() {
      this.$Api.saveNFConfig(this.form, this.nfName, this.userID).then((res) => {
        if(res.data=="开启成功"){
          this.$message.success("开启成功！")
        }else this.$message.error("开启失败！")
        this.$emit("update:son_visible",false)
      })
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



