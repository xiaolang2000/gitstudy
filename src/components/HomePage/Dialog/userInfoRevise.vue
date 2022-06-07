<template>
  <el-dialog
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="dialogClose"
      width="80%"
      top="10"
      title="用户注册信息修改"
  >
    <el-card>
      <el-row :gutter="20">
        <el-col :span="9" class="sign">
          <el-form :model="subscribers" ref="user" label-width="200px">
            <el-form-item label="IMSI" prop="IMSI" placeholder="请输入" >
              <el-input v-model="subscribers.imsi" ></el-input>
            </el-form-item>
            <el-form-item label="subscribed_rau_tau_timer" prop="subscribed_rau_tau_timer" placeholder="请输入">
              <el-input v-model="subscribers.subscribed_rau_tau_timer"></el-input>
            </el-form-item>
            <el-form-item label="network_access_mode" prop="network_access_mode" placeholder="请输入">
              <el-input v-model="subscribers.network_access_mode"></el-input>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="9" class="sign">
          <el-form :model="subscribers" ref="user" label-width="200px">
            <el-form-item label="subscriber_status" prop="subscriber_status" placeholder="请输入">
              <el-input v-model="subscribers.subscriber_status"></el-input>
            </el-form-item>
            <el-form-item label="access_restriction_data" prop="access_restriction_data" placeholder="请输入">
              <el-input v-model="subscribers.access_restriction_data"></el-input>
            </el-form-item>
            <el-form-item label="schema_version" prop="schema_version" placeholder="请输入">
              <el-input v-model="subscribers.schema_version"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>


      <el-row>
        <el-col>
          <el-descriptions title="slice"></el-descriptions>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="9" class="sign">
          <el-form :model="subscribers" ref="user" label-width="200px">
            <el-form-item label="sst" prop="sst" placeholder="请输入">
              <el-input v-model="subscribers.slice[0].sst"></el-input>
            </el-form-item>
            <el-form-item label="default_indicator" prop="default_indicator" placeholder="请输入">
              <el-input v-model="subscribers.slice[0].default_indicator"></el-input>
            </el-form-item>
            <el-form-item label="session name" prop="uplink unit" placeholder="请输入">
              <el-input v-model="subscribers.slice[0].session[0].ambr.uplink.unit"></el-input>
            </el-form-item>
            <el-form-item label="session type" prop="session type" placeholder="请输入">
              <el-input v-model="subscribers.slice[0].session[0].type"></el-input>
            </el-form-item>
            <el-form-item label="uplink value" prop="uplink value" placeholder="请输入">
              <el-input v-model="subscribers.slice[0].session[0].ambr.uplink.value"></el-input>
            </el-form-item>
            <el-form-item label="uplink unit" prop="uplink unit" placeholder="请输入">
              <el-input v-model="subscribers.slice[0].session[0].ambr.uplink.unit"></el-input>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="9" class="sign">
          <el-form :model="subscribers" ref="user" label-width="200px">
            <el-form-item label="QoS index" prop="QoS index" placeholder="请输入">
              <el-input v-model="subscribers.slice[0].session[0].qos.index"></el-input>
            </el-form-item>
            <el-form-item label="priority_level" prop="priority_level" placeholder="请输入">
              <el-input v-model="subscribers.slice[0].session[0].qos.arp.priority_level"></el-input>
            </el-form-item>
            <el-form-item label="pre_emption_capability" prop="pre_emption_capability" placeholder="请输入">
              <el-input v-model="subscribers.slice[0].session[0].qos.arp.pre_emption_capability"></el-input>
            </el-form-item>
            <el-form-item label="pre_emption_vulnerability" prop="pre_emption_vulnerability" placeholder="请输入">
              <el-input v-model="subscribers.slice[0].session[0].qos.arp.pre_emption_vulnerability"></el-input>
            </el-form-item>
            <el-form-item label="downlink value" prop="downlink value" placeholder="请输入">
              <el-input v-model="subscribers.slice[0].session[0].ambr.downlink.value"></el-input>
            </el-form-item>
            <el-form-item label="downlink unit" prop="downlink unit" placeholder="请输入">
              <el-input v-model="subscribers.slice[0].session[0].ambr.downlink.unit"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>


      <el-row>
        <el-col>
          <el-descriptions title="ambr"></el-descriptions>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="9" class="sign">
          <el-form :model="subscribers" ref="user" label-width="200px">
            <el-form-item label="uplink value" prop="uplink value" placeholder="请输入">
              <el-input v-model="subscribers.ambr.uplink.value"></el-input>
            </el-form-item>
            <el-form-item label="uplink unit" prop="uplink unit" placeholder="请输入">
              <el-input v-model="subscribers.ambr.uplink.unit"></el-input>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="9" class="sign">
          <el-form :model="subscribers" ref="user" label-width="200px">
            <el-form-item label="downlink value" prop="downlink value" placeholder="请输入">
              <el-input v-model="subscribers.ambr.downlink.value"></el-input>
            </el-form-item>
            <el-form-item label="downlink unit" prop="downlink unit" placeholder="请输入">
              <el-input v-model="subscribers.ambr.downlink.unit"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>


      <el-row>
        <el-col>
          <el-descriptions title="security"></el-descriptions>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15" class="sign">
          <el-form :model="subscribers" ref="user" label-width="200px">
            <el-form-item label="security_k" prop="security_k" placeholder="请输入">
              <el-input v-model="subscribers.security.k"></el-input>
            </el-form-item>
            <el-form-item label="security_amf" prop="security_amf" placeholder="请输入">
              <el-input v-model="subscribers.security.amf"></el-input>
            </el-form-item>
            <el-form-item label="security_op" prop="security_op" placeholder="请输入">
              <el-input v-model="subscribers.security.op"></el-input>
            </el-form-item>
            <el-form-item label="security_opc" prop="security_opc" placeholder="请输入">
              <el-input v-model="subscribers.security.opc"></el-input>
            </el-form-item>
            <el-form-item label="security_sqn" prop="security_sqn" placeholder="请输入">
              <el-input v-model="subscribers.security.sqn"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row>
        <el-col :offset="10">
          <el-button type="primary" @click="submitForm('subscribers')">确定</el-button>
          <el-button  @click="dialogClose()">取消</el-button>
        </el-col>
      </el-row>
    </el-card>

  </el-dialog>
</template>
<script>
export default {
  name: "userInfoRevise", //资源预览界面的点击弹出资源详情框
  props: {
    s_dialogFlag: false,
    subscribers: {}, //父组件传递过来name
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    dialogClose() {
      this.$emit("update:s_dialogFlag", false);
    },
    submitForm(formName) {
      this.$Api
          .addMongoUser(this.subscribers)
          .then((res) => {
            console.log(res)
            if (res.data) {
              this.$message({
                message: "成功",
                type: "success",
              });
              this.dialogClose();
            } else {
              this.$message({
                message: "失败",
                type: "error",
              })
            }
          })
    },
  },
  watch: {
    s_dialogFlag() {
      this.visible = this.s_dialogFlag;
      if (this.s_dialogFlag === true) {
        this.getUser();
      }
    }
  }
}
</script>
<style scoped>
</style>
