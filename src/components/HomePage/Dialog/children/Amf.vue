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
    <!--分类标题-->
    <!--左列-->
    <!--右列-->
    <el-form :label-position="labelPosition1" label-width="120px" ref="form" size="mini" :model="form" v-if="form.amf">
      <el-row>
        <!--分类标题-->

        <!--左列-->
        <el-col :span="8" >
          <el-tooltip placement="top-start" effect="light">
            <div slot="content">网络与网元名称</div>
            <el-descriptions title="Name"></el-descriptions>
          </el-tooltip>
          <el-form-item label="Network Name">
            <el-input v-model="form.amf.network_name.full" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="AMF Name">
            <el-input v-model="form.amf.amf_name" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
        <!--中列-->
        <el-col :span="8">
          <el-tooltip placement="left-start" effect="light">
            <div slot="content">5G核心网架构中通过服务接口SBI（基于服务的接口）<br/>访问服务提供者提供的服务</div>
            <el-descriptions title="SBI"></el-descriptions>
          </el-tooltip>
          <el-form-item label="Address">
            <el-input v-model="form.amf.sbi[0].addr" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="Port">
            <el-input v-model="form.amf.sbi[0].port" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>

        <!--右列-->
        <el-col :span="8" >
          <el-tooltip placement="left-start" effect="light">
            <div slot="content">NGAP 提供了RAN和AMF之间的信令服务</div>
            <el-descriptions title="NGAP"></el-descriptions>
          </el-tooltip>
          <el-form-item label="NGAP Address">
            <el-input v-model="form.amf.ngap[0].addr" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <!--左列-->
        <el-col :span="8" >
          <el-tooltip placement="top-start" effect="light">
            <div slot="content">GUAMI 用于唯一标识 5G 网络中的 AMF。<br/>
              它由 MCC（Mobile Country Code）、<br/>
              MNC（Mobile Network Code）、AMF Region、<br/>
              AMF Set 组成</div>
            <el-descriptions title="GUAMI"></el-descriptions>
          </el-tooltip>
          <el-form-item label="MCC">
            <el-input v-model="form.amf.guami[0].plmn_id.mcc" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="MNC">
            <el-input v-model="form.amf.guami[0].plmn_id.mnc" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="AMF Region">
            <el-input v-model="form.amf.guami[0].amf_id.region" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="AMF Set">
            <el-input v-model="form.amf.guami[0].amf_id.set" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>
        <!--中列-->
        <el-col :span="8">
          <el-tooltip placement="left-start" effect="light">
            <div slot="content">TAI 为跟踪区域码<br/>
              TAC是型号分配码，也是IMEI（国际移动设备识别码）的号头</div>
            <el-descriptions title="TAI"></el-descriptions>
          </el-tooltip>
          <el-form-item label="MCC">
            <el-input v-model="form.amf.tai[0].plmn_id.mcc" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="MNC">
            <el-input v-model="form.amf.tai[0].plmn_id.mnc" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="TAC">
            <el-input v-model="form.amf.tai[0].tac" style="width: 50%;"></el-input>
          </el-form-item>
        </el-col>

        <!--右列-->
        <el-col :span="8" >
          <el-tooltip placement="left-start" effect="light">
            <div slot="content">配置 AMF 归属的 PLMN 包括切片的信息<br/>
              SST（Slice/Service Type，切片/服务类型）</div>
            <el-descriptions title="PLMN Support"></el-descriptions>
          </el-tooltip>
          <el-form-item label="MCC">
            <el-input v-model="form.amf.plmn_support[0].plmn_id.mcc" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="MNC">
            <el-input v-model="form.amf.plmn_support[0].plmn_id.mnc" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="NSSAI SST">
            <el-input v-model="form.amf.plmn_support[0].s_nssai[0].sst" style="width: 40%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>

        <!--中列-->
        <el-col :span="8">
          <el-tooltip placement="top-start" effect="light">
            <div slot="content">配置 NRF 的信息<br/></div>
            <el-descriptions title="NRF SBI"></el-descriptions>
          </el-tooltip>
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
      <el-col :span="5" :offset="8">
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-col>
      <el-col :span="5">
        <el-button @click="onCancel">关闭</el-button>
      </el-col>
    </el-row>
  </div>


</template>

<script>
export default {
  name: "Amfcard",
  props:{
    innerVisible:"",
    form:Object,
    userID: "",
    nfName:"",
    saveFlag:false
  },
  data() {
    return {
      labelPosition1: 'left',
      labelPosition2: 'top',
    }
  },
  mounted() {
    // this.
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



