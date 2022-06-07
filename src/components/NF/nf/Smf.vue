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

    <el-form :label-position="labelPosition1" label-width="150px" ref="form" size="mini" :model="form">
      <el-row>
<!--        左列-->
        <el-col :span="8" >
          <el-descriptions title="SBI"></el-descriptions>
          <el-form-item label="Address">
            <el-input v-model="form.smf.sbi[0].addr" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="Port">
            <el-input v-model="form.smf.sbi[0].port" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
<!--中列-->



        <el-col :span="8" >
          <el-tooltip placement="left-start" effect="light">
            <div slot="content">PFCP协议栈用于控制面与用户面之间在N4接口的交互</div>
            <el-descriptions title="PFCP Server"></el-descriptions>
          </el-tooltip>
          <el-form-item label="PFCP Address(IPv4)">
            <el-input v-model="form.smf.pfcp[0].addr" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="PFCP Address(IPv6)">
            <el-input v-model="form.smf.pfcp[1].addr" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>

        <!--右列-->
        <el-col :span="8" >
          <el-tooltip placement="left-start" effect="light">
            <div slot="content">GTP-C为GPRS隧道协议控制面部分协议</div>
            <el-descriptions title="GTP-C Server"></el-descriptions>
          </el-tooltip>
          <el-form-item label="GTP-C Address(IPv4)">
            <el-input v-model="form.smf.gtpc[0].addr" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="GTP-C Address(IPv6)">
            <el-input v-model="form.smf.gtpc[1].addr" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
<!--        左列-->
        <el-col :span="8" >
          <el-tooltip placement="top-start" effect="light">
            <div slot="content">GTP-U为GPRS隧道协议用户面部分协议<br/></div>
            <el-descriptions title="GTP-U Server"></el-descriptions>
          </el-tooltip>
          <el-form-item label="GTP-U Address(IPv4)">
            <el-input v-model="form.smf.gtpu[0].addr" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="GTP-U Address(IPv6)">
            <el-input v-model="form.smf.gtpu[1].addr" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
      <!--中列-->
        <el-col :span="8" >
          <el-tooltip placement="left-start" effect="light">
            <div slot="content">为用户分配IP的资源池</div>
            <el-descriptions title="Subnet for UE Pool"></el-descriptions>
          </el-tooltip>
          <el-form-item label="IPv4 Pool">
            <el-input v-model="form.smf.subnet[0].addr" style="width: 70%;"></el-input>
          </el-form-item>
          <el-form-item label="IPv6 Pool">
            <el-input v-model="form.smf.subnet[1].addr" style="width: 70%;"></el-input>
          </el-form-item>
        </el-col>
          <!--右列-->
        <el-col :span="8" >
          <el-descriptions title="NRF SBI"></el-descriptions>
          <el-form-item label="Address">
            <el-input v-model="form.nrf.sbi[0].addr[0]" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="Port">
            <el-input v-model="form.nrf.sbi[0].port" style="width: 50%;"></el-input>
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
  name: "Smfcard",
  props:{
    son_visible:"false",
    form:"",
    userID: "",
  },
  data() {
    return {
      labelPosition1: 'right',
      labelPosition2: 'top',
      nfName: "SMF",
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



