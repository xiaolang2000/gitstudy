<template>
  <el-dialog
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="dialogClose"
      width="80%"
      title="查看在线用户信息"
  >
    <el-card>
      <el-form :model="onlineUser" ref="user" label-width="200px">
      <el-row :gutter="20">

            <el-col :span="9" class="sign">
            <el-form-item label="sim"  placeholder="请输入" >
              <el-input v-model="onlineUser.sim" disabled></el-input>
            </el-form-item>
            <el-form-item label="plmn" placeholder="请输入">
              <el-input v-model="onlineUser.plmn" disabled></el-input>
            </el-form-item>
            <el-form-item label="tai"  placeholder="请输入">
              <el-input v-model="onlineUser.tai" disabled></el-input>
            </el-form-item>
            <el-form-item label="dnn"  placeholder="请输入">
              <el-input v-model="onlineUser.dnn" disabled></el-input>
            </el-form-item>
              <el-form-item label="ipv4"  placeholder="请输入">
                <el-input v-model="onlineUser.ipv4" disabled></el-input>
              </el-form-item>
              <el-form-item label="ipv6"  placeholder="请输入">
                <el-input v-model="onlineUser.ipv6" disabled></el-input>
              </el-form-item>
              <el-form-item label="nssai"  placeholder="请输入">
                <el-input v-model="onlineUser.nssai" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="suci"  placeholder="请输入">
                <el-input v-model="onlineUser.suci" disabled></el-input>
              </el-form-item>
              <el-form-item label="supi"  placeholder="请输入">
                <el-input v-model="onlineUser.supi" disabled></el-input>
              </el-form-item>
              <el-form-item label="amf_id"  placeholder="请输入">
                <el-input v-model="onlineUser.amf_id" disabled></el-input>
              </el-form-item>
              <el-form-item label="dnn"  placeholder="请输入">
                <el-input v-model="onlineUser.dnn" disabled></el-input>
              </el-form-item>
              <el-form-item label="ul_count"  placeholder="请输入">
                <el-input v-model="onlineUser.ul_count" disabled></el-input>
              </el-form-item>
              <el-form-item label="psi"  placeholder="请输入">
                <el-input v-model="onlineUser.psi" disabled></el-input>
              </el-form-item>
              <el-form-item label="gnb_id"  placeholder="请输入">
                <el-input v-model="onlineUser.gnb_id" disabled></el-input>
              </el-form-item>
            </el-col>
      </el-row>
          </el-form>



      <el-row>
        <el-col :offset="10">
          <el-button  @click="dialogClose()">关闭</el-button>
        </el-col>
      </el-row>
    </el-card>

  </el-dialog>
</template>
<script>
export default {
  name: "sqlUserInfoRevise", //资源预览界面的点击弹出资源详情框
  props: {
    s_dialogFlag: false,
    onlineUser: {}, //父组件传递过来name
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
  },
  watch: {
    s_dialogFlag() {
      this.visible = this.s_dialogFlag;
    }
  }
}
</script>
<style scoped>
</style>
