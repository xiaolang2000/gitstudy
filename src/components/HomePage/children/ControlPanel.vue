<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header">
        <span>控制面板</span><span class="nfName">{{ showNfName }}</span>
        <el-button type="danger" @click="initBatch1"  style="float: right;" icon="el-icon-video-pause">批量关闭网元</el-button>
        <el-button type="success" @click="initBatch2"  style="float: right; margin-right: 10px" icon="el-icon-video-play">批量开启网元</el-button>

        <el-dialog title="目前处于运行状态的网元" :visible.sync="dialogVisible1" width="40%">
          <el-row>
            <el-col :span="16" :offset="4">
              <el-table
                  ref="multipleTable"
                  :data="runningTableData"
                  tooltip-effect="dark"
               @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="网元名称"
                    width="120"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="120">
                  <template slot-scope="scope">
                    <el-tag size="medium" type="success">{{ scope.row.status }}</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="6">
            <el-button type="danger" @click="stopAll">停止所选网元</el-button>
            <el-button type="primary" @click="dialogVisible1=false">取消</el-button>
          </el-col>
          </el-row>
        </el-dialog>
        <el-dialog title="目前处于停止状态的网元" :visible.sync="dialogVisible2" width="40%">
          <el-row>
            <el-col :span="16" :offset="4">
              <el-table
                  ref="multipleTable"
                  :data="stoppedTableData"
                  tooltip-effect="dark"
                  @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="网元名称"
                    width="120"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="120">
                  <template slot-scope="scope">
                    <el-tag size="medium" type="danger">{{ scope.row.status }}</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="6">
              <el-button type="success" @click="runAll">开启所选网元</el-button>
              <el-button type="primary" @click="dialogVisible2=false">取消</el-button>
            </el-col>
          </el-row>
        </el-dialog>
<!--        <el-dialog title="目前处于停止状态的网元" :visible.sync="dialogVisible">
        </el-dialog>-->
      </div>
      <el-row>
        <span style="font-weight: bold;font-size: 18px;">配置信息</span>
      </el-row>
      <el-row :gutter='20'>
        <div v-if="nfType===''">
          <el-empty description="请点击想查看的网元" style="height: 10vh"></el-empty>
        </div>
        <div v-if="(nfType!=='upf' && nfType!=='nrf' && sbi_addr && sbi_port)">
          <el-col :span="8">
            <el-form ref="form" label-width="80px" style="margin-top: 10px;">
              <el-form-item label="SBI IP">
                <el-input v-model="sbi_addr" maxlength="30" placeholder="显示网元SBI IP" disabled></el-input>
              </el-form-item>
              <el-form-item label="SBI Port">
                <el-input v-model="sbi_port" maxlength="30" placeholder="显示网元SBI Port" disabled></el-input>
              </el-form-item>
            </el-form>

          </el-col>
          <el-col :span="8">
            <el-form ref="form" label-width="100px" style="margin-top: 10px;">
              <el-form-item label="NRF SBI IP">
                <el-input v-model="nrf_addr" maxlength="30" placeholder="显示NRF SBI IP" disabled></el-input>
              </el-form-item>
              <el-form-item label="NRF SBI Port">
                <el-input v-model="nrf_port" maxlength="30" placeholder="显示NRF SBI Port"disabled></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <div v-if="nfType==='amf'">
              <el-form ref="form" label-width="120px" style="margin-top: 10px;">
                <el-form-item label="PLMN_ID MCC">
                  <el-input v-model="amf.mcc" maxlength="30"  disabled></el-input>
                </el-form-item>
                <el-form-item label="PLMN_ID MNC">
                  <el-input v-model="amf.mnc" maxlength="30" disabled></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="nfType==='smf'">
              <el-form ref="form" label-width="120px" style="margin-top: 10px;">
                <el-form-item label="UCN_INFO">
                  <el-input v-model="smf.ucn_info" maxlength="30" disabled></el-input>
                </el-form-item>
                <el-form-item label="SUBNET_IP">
                  <el-input v-model="smf.subnet" maxlength="30" disabled></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </div>
        <div v-if="nfType==='upf'">
          <el-col :span="12">
            <el-form ref="form" label-width="150px" style="margin-top: 10px;">
              <el-form-item label="PFCP Address(IPv4)">
                <el-input v-model="nfConfig.upf.pfcp[0].addr" style="width: 70%;" disabled></el-input>
              </el-form-item>
              <el-form-item label="Subnet Address(IPv4)">
                <el-input v-model="nfConfig.upf.subnet[0].addr" style="width: 70%;" disabled></el-input>
              </el-form-item>
            </el-form>

          </el-col>
          <el-col :span="12">
            <!--        <span style="font-weight: bold;font-size: 18px;"> 网元日志</span>
                    <el-input
                        type="textarea"
                        rows="8"
                        placeholder="请输入内容"
                        readonly
                        v-model="log" style="margin-top: 10px;"></el-input>-->
            <el-form ref="form" label-width="150px" style="margin-top: 10px;">
              <el-form-item label="GTP-U Address(IPv4)">
                <el-input v-model="nfConfig.upf.gtpu[0].addr" style="width: 70%;" disabled></el-input>
              </el-form-item>
              <el-form-item label="Subnet Address(IPv6)">
                <el-input v-model="nfConfig.upf.subnet[1].addr" style="width: 70%;" disabled></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
        <div v-if="nfType==='nrf'">
          <el-col :span="12">
            <el-form ref="form" label-width="150px" style="margin-top: 10px;">
              <el-form-item label="显示 SBI IP">
                <el-input v-model="nrf.addr" style="width: 70%;" disabled></el-input>
              </el-form-item>
              <el-form-item label="显示 SBI Port">
                <el-input v-model="nrf.port" style="width: 70%;" disabled></el-input>
              </el-form-item>
            </el-form>
          </el-col>

        </div>
      </el-row>
      <el-row>
        <el-col :offset="5">
          <el-button type="primary"  style="margin-right:2px " @click="handleEdit"  v-if="nfName!==''">编辑</el-button>
          <el-button type="primary" style="margin-right:2px " @click="handleEdit"  v-else-if="nfName===''" disabled>编辑</el-button>
          <el-popover
              placement="top"
              width="160"
              v-model="deleteDialog">
            <p>确定要删除网元{{showNfName}}吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="deleteDialog = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteNF">确定</el-button>
            </div>

            <el-button slot="reference" type="danger"  v-if="nfName!==''">删除</el-button>
            <el-button slot="reference" type="danger" v-else-if="nfName===''" disabled>删除</el-button>

          </el-popover>
          <el-switch
              v-model="nfSwitch"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="运行"
              inactive-text="停止"
              @change="handleSwitch(nfSwitch)"
              style="padding-left: 20px;padding-right: 20px"
              v-if="nfType!==''"
          >
          </el-switch>
          <el-switch
              v-model="nfSwitch"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="运行"
              inactive-text="停止"
              @change="handleSwitch(nfSwitch)"
              style="padding-left: 20px;padding-right: 20px"
              v-else-if="nfType===''"
              disabled
          >
          </el-switch>
          <el-button type="primary" @click="handleLog" v-if="nfType===''" disabled icon="el-icon-s-order">点击查看日志</el-button>
          <el-button type="primary" @click="handleLog" v-if="nfType!==''" icon="el-icon-s-order">点击查看日志</el-button>

          <el-dialog
              :visible.sync="logVisible"
              width="80%">
            <span style="font-weight: bold;font-size: 18px;">{{nfName}} 网元日志</span>
            <el-input
                type="textarea"
                placeholder="请输入内容"
                rows="20"
                readonly
                v-model="log" style="margin-top: 10px;"></el-input>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="logVisible = false">关闭</el-button>
  </span>
          </el-dialog>
        </el-col>

      </el-row>
    </el-card>
    <ControlRevise :user-i-d="userID" :s_dialog-flag="father_visible" :nf-name="nfName" :nf-type="nfType"></ControlRevise>
  </div>


</template>

<script>
import {EventBus} from "@/eventBus/eventBus";
import ControlRevise from "@/components/HomePage/Dialog/ControlRevise";
export default {
  inject: ['reload'],
  components: {ControlRevise},
  name: "UserList",

  data() {
    return {
      nfList:[],
      runningTableData:[],
      stoppedTableData:[],
      selectedTableData:Object,
      dialogVisible1:false,
      dialogVisible2:false,
      logVisible:false,
      nfName: "",
      showNfName:"",
      nfState: "",
      nfConfig:Object,
      nfType:"",
      log: "",
      userID: "",
      sbi_addr: "",
      sbi_port: "",
      nrf_addr: "",
      nrf_port: "",
      nfSwitch: false,
      father_visible: false,
      deleteDialog:false,
      amf:{
        mcc:"",
        mnc:""
      },
      nrf:{
        addr:"",
        port:""
      },
      smf:{
        ucn_info:"",
        subnet:""
      }
    }
  },


  mounted() {
    this.userID = this.$store.getters.get_userID
    this.nfName = this.$store.getters.get_nfSwitch[0]
    this.nfState = this.$store.getters.get_nfSwitch[1]
    this.getNF(this.nfName, this.userID,this.nfType)
    this.getLog(this.nfName, this.userID)
    EventBus.$on('nf', (nfName) => {
      if (nfName !== "") {
        this.getNF(nfName, this.userID)
        this.getLog(nfName, this.userID)
      }
    })
    EventBus.$on('state', (state) => {
      if (state !== "")
        this.nfState = state
    })
  },


  methods: {
    getNF(nfName, userID) {
      this.nfName = nfName
      this.nfType = nfName.toLowerCase().slice(0,nfName.length-1)
      this.$Api.getNF(nfName, userID,this.nfType).then((res) => {
        this.nfConfig = res.data
        let configName = nfName.toLowerCase().slice(0,nfName.length-1)
        if (configName !=='nrf'){
          this.sbi_addr = res.data[configName].sbi[0].addr
          this.sbi_port = res.data[configName].sbi[0].port
          this.nrf_addr = res.data["nrf"].sbi[0].addr
          this.nrf_port = res.data["nrf"].sbi[0].port
          if (configName === "amf"){
            this.amf.mcc = res.data[configName].plmn_support[0].plmn_id.mcc
            this.amf.mnc = res.data[configName].plmn_support[0].plmn_id.mnc
          }
          else if(configName==="smf"){
            this.smf.ucn_info = res.data.smf.info[0].ucn_info
            this.smf.subnet = res.data.smf.subnet[0].addr
          }
        }
        else if (configName==='nrf'){
          this.nrf.addr = res.data.nrf.sbi.addr[0]
          this.nrf.port = res.data.nrf.sbi.port
        }

      })
    },
    handleLog(){
      this.logVisible = true
    },
    getLog(nfName, userID) {
      this.$Api.getLog(nfName, userID).then(
          (res) => {
            this.log = res.data
          }
      )
    },
    deleteNF() {
      if (this.nfName !== null) {
        this.$Api.deleteNF(this.nfName, this.userID).then((res) => {
            this.$message.success("删除网元成功！")
            this.$store.commit("delete_nfSwitch")
            this.deleteDialog = false
            this.reload()
        })
      }
    },
    handleEdit() {
      this.father_visible = true
    },
    handleSwitch(flag) {
      let state = ""
      if (flag === true) {
        this.$Api.startNF(this.nfName, this.userID,this.nfType).then((res) => {
          if (res.data === "开启成功") {
            this.$message.success("开启"+this.nfName+"成功")
            state = "running"
          } else {
            this.$message.error("开启"+this.nfName+"失败!请检查配置和日志！")
            state = "stop"
          }
        }).then(() => {
          this.$store.commit("set_nfSwitch", [this.nfName, state])
        }).then(() => this.reload());
      } else {
        this.$Api.stopNF(this.nfName).then((res) => {
          console.log("处理关闭")
          if (res.data === "关闭成功") {
            this.$message.success("关闭"+this.nfName+"成功")
            state = "stop"
          } else {
            this.$message.error("关闭"+this.nfName+"失败!请检查日志！")
            state = "running"
          }
        }).then(() => {
          this.$store.commit("set_nfSwitch", [this.nfName, state])
        }).then(() => this.reload());
      }
    },
    initBatch1(){
      this.dialogVisible1 = true
      this.runningTableData  = this.runningTableData.slice(0,0)
      this.stoppedTableData  = this.stoppedTableData.slice(0,0)
      this.$Api.init(this.userID).then((res)=>{
        this.nfList = res.data.nfList
        Object.keys(this.nfList).forEach((key)=>{
          console.log(key,this.nfList[key])
          let type = ""
          for (let i in key) {
            let asc = key.charCodeAt(i)
            if (asc >= 65 && asc <= 90) {
              type = type + key.charAt(i)
            }
          }
          if (this.nfList[key]==='stop'){
            this.stoppedTableData.push({name:key,status:'停止中',type:type})
          }else {
            this.runningTableData.push({name:key,status:'运行中',type:type})
          }
        })
      })
    },
    initBatch2(){
      this.dialogVisible2 = true
      this.runningTableData  = this.runningTableData.slice(0,0)
      this.stoppedTableData  = this.stoppedTableData.slice(0,0)
      this.$Api.init(this.userID).then((res)=>{
        this.nfList = res.data.nfList
        Object.keys(this.nfList).forEach((key)=>{
          let type = ""
          for (let i in key) {
            let asc = key.charCodeAt(i)
            if (asc >= 65 && asc <= 90) {
              type = type + key.charAt(i)
            }
          }
          if (this.nfList[key]==='stop'){
            this.stoppedTableData.push({name:key,status:'停止中',type:type})
          }else {
            this.runningTableData.push({name:key,status:'运行中',type:type})
          }
        })
      })
    },
    handleSelectionChange(val) {
      this.selectedTableData = val;
    },
    stopAll(){
      let that = this
      new Promise(function (resolve) {
        for (let nf of that.selectedTableData) {
          that.$Api.stopNF(nf.name).then((res) => {
            if (res.data === "关闭成功")
              that.$message.success("关闭" + nf.name + "成功！")
            else {
              that.$message.error("关闭" + nf.name + "失败，请检查配置！")
            }
          })
        }
        resolve()
      }).then((resolve) => {
        that.dialogVisible1 = false
        this.reload()
      })
    },
    runAll(){
      let that = this
      new Promise(function (resolve) {
        for (let nf of that.selectedTableData) {
          that.$Api.startNF(nf.name, that.userID, nf.type).then((res) => {
            if (res.data === "开启成功")
              that.$message.success("开启" + nf.name + "成功！")
            else {
              that.$message.error("开启" + nf.name + "失败，请检查配置！")
            }
          })
        }
        resolve()
      }).then((resolve) => {
        that.dialogVisible2 = false
        this.reload()
      })
    },
  },
  watch: {
    nfState() {
      console.log(this.nfState)
      this.nfSwitch = this.nfState !== "stop";
    },
    nfName(){
      this.showNfName = this.nfName.toUpperCase()
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  margin: 0 2vh 1vh 2vh;
  height: 35vh;
  border-radius: 16px;

  span {
    font-size: 20px;
    font-weight: bold;
  }

  .nfName {
    font-size: 20px;
    font-weight: bold;
    color: #409EFF;
  }
}
</style>
