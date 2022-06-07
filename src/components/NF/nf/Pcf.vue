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
          <el-descriptions title="PCF SBI"></el-descriptions>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8" :offset="6">
          <el-form-item label="sbi address">
            <el-input v-model="form.pcf.sbi[0].addr" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="sbi port">
            <el-input v-model="form.pcf.sbi[0].port" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :offset="6">
          <el-descriptions title="NRF SBI"></el-descriptions>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8" :offset="6">
          <el-form-item label="address">
            <el-input v-model="form.nrf.sbi[0].addr[0]" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="port">
            <el-input v-model="form.nrf.sbi[0].port" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :offset="6">
          <el-descriptions title="其他配置"></el-descriptions>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8" :offset="6">
          <el-form-item label="max">
            <el-input v-model="form.max" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="parameter">
            <el-input v-model="form.parameter" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8" :offset="6">
          <el-form-item label="pool">
            <el-input v-model="form.pool" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="time">
            <el-input v-model="form.time" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col  :span="13" :offset="6">
          <el-form-item label="logger">
            <el-input v-model="form.logger.file" style="width: 100%;" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col  :span="13" :offset="6">
          <el-form-item label="db_uri">
            <el-input v-model="form.db_uri" style="width: 100%;" disabled></el-input>
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
  name: "Pcfcard",
  props:{
    son_visible:"false",
    form:"",
    userID: "",
  },
  data() {
    return {
      labelPosition1: 'right',
      labelPosition2: 'top',
      nfName: "pcf",
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



