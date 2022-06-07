<template>
  <el-dialog
      :visible.sync="outerVisible"
      :close-on-click-modal="false"
      @close="dialogClose"
      width="80%"
      style="height:100%;"
      top="10"
  >

    <el-steps :active="step" simple>
      <el-step title="选择要开启的网元" icon="el-icon-edit"></el-step>
      <el-step title="修改网元配置" icon="el-icon-upload"></el-step>
    </el-steps>

    <div><span style="color: #67C23A">运行中：</span>
      <div v-for="n in nf" style="display: inline;padding: 5px" v-if="check[n]==='running'">
        <el-tag type="success" effect="dark">{{ n }}</el-tag>
      </div>
    </div>

    <div><span style="color: #F56C6C">停止中：</span>
      <div v-for="n in nf" style="display: inline;padding: 5px" v-if="check[n]==='stop'">
        <el-tag type="danger" effect="dark">{{ n }}</el-tag>
      </div>
    </div>
    <div><i class="el-icon-warning"></i>更改单个网元的配置后请点击其保存按钮！</div>
    <!--第一步，选择要开启的网元们-->
    <div v-show="step===0">
      <el-row>
        <el-col :span="4" :offset="3" class="title">核心网网元</el-col>
        <el-col :span="4" :offset="0" class="title">配置数目</el-col>
        <el-col :span="4" :offset="1" class="title">核心网网元</el-col>
        <el-col :span="4" :offset="0" class="title">配置数目</el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="3">
          <div v-for="nf in startList.slice(0,5)">
            <img :src="icon[nf.type]" height="60vh" width="60vw">
          </div>
        </el-col>
        <el-col :span="5" style="line-height: 60px;display:inline-block;">
          <div v-for="nf in startList.slice(0,5)">
            <span class="label">{{ nf.type }}</span>
            <el-input-number v-model="nf.number" :min="0" :max="5"
                             style="float: right"></el-input-number>
          </div>
        </el-col>
        <el-col :span="2" :offset='2'>
          <div v-for="nf in startList.slice(5,)">
            <img :src="icon[nf.type]" height="60vh" width="60vw">
          </div>
        </el-col>
        <el-col :span="5" style="line-height: 60px;display:inline-block;">
          <div v-for="nf in startList.slice(5,)">
            <span class="label">{{ nf.type }}</span>
            <el-input-number v-model="nf.number" :min="0" :max="5"
                             style="float: right"></el-input-number>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--第二步，进行网元配置的修改-->

    <el-tabs v-model="activeType" type="card" v-show="step===1">
      <el-tab-pane v-for="(nf,index) in tabList" :label=nf :name=nf :key="index">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              label="网元实例名"
              width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="是否配置"
              width="180">
            <template slot-scope="scope">
              <el-tag size="medium" v-if="scope.row.status==='未配置'" type="danger">{{ scope.row.status }}</el-tag>
              <el-tag size="medium" v-if="scope.row.status==='已配置'" type="success">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="medium"
                  type="primary"
                  @click="handleEdit(scope.row.name)">配置网元参数
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-divider></el-divider>
    <!--操组按钮-->
    <div style="padding-left: 35%">
      <el-button style="margin-top: 12px;" @click="handleNext" v-show="step!==1" type="primary">下一步<i
          class="el-icon-arrow-right el-icon--right"></i></el-button>
      <div v-if="step===1">
        <el-button style="margin-top: 12px;" @click="runAll" v-if="runAble===true" type="success">开启所有网元</el-button>
        <el-button style="margin-top: 12px;" @click="runAll" v-else type="success" disabled>开启所有网元</el-button>
      </div>

    </div>
    <SingleNFRevise :inner-visible.sync="innerVisible" :user-i-d.sync="userID" :nf-name.sync="activeName"
                    :config.sync="config" :nf-type.sync="activeType"></SingleNFRevise>
  </el-dialog>


</template>

<script>
import Nfconfig from "@/components/NF/Nfconfig";
import SingleNFRevise from "@/components/HomePage/Dialog/SingleNFRevise";
import Back from "@/views/Back";
import {EventBus} from "@/eventBus/eventBus";
export default {
  name: "NFRevise",
  components: {SingleNFRevise, Nfconfig,},
  props: {
    outerVisible: false,
    userID: "",
    // 这三个变量是用于显示网元状态的
    stateList: [],
    nfList: [],
    checkList: [],
  },
  inject: ["reload"],
  data() {
    return {
      tabList: [],
      tableData: [{
        status: '已配置',
        name: 'AMF0',
      }],
      number: 0,
      activeName: "",
      activeType: "",
      visible: false,
      innerVisible: false,
      // 这三个变量是用于显示网元状态的
      nf: [],
      state: [],
      check: [],
      config: {},
      // 创建网元的步骤
      step: 0,
      // 要创建的网元列表
      startList: [
        {type: "AMF", number: 0}, {type: "PCF", number: 0}, {type: "SMF", number: 0},
        {type: "NRF", number: 0}, {type: "AUSF", number: 0}, {type: "BSF", number: 0},
        {type: "NSSF", number: 0}, {type: "UDM", number: 0}, {type: "UPF", number: 0}, {type: 'UDR', number: 0}],
      icon: {
        AMF: "/static/normal/amf.png",
        AUSF: "/static/normal/ausf.png",
        NRF: "/static/normal/nrf.png",
        NSSF: "/static/normal/nssf.png",
        PCF: "/static/normal/pcf.png",
        SMF: "/static/normal/smf.png",
        UDM: "/static/normal/udm.png",
        UDR: "/static/normal/udr.png",
        UPF: "/static/normal/upf.png",
        BSF: "/static/normal/bsf.png",
      },
      // 根据用户的选择，生成的网元列表
      UDR: () => import('@/components/NF/nf/Udr'),
      AMF: () => import("@/components/NF/nf/Amf"),
      SMF: () => import("@/components/NF/nf/Smf"),
      AUSF: () => import( "@/components/NF/nf/Ausf"),
      BSF: () => import("@/components/NF/nf/Bsf"),
      NRF: () => import("@/components/NF/nf/Nrf"),
      NSSF: () => import( "@/components/NF/nf/Nssf"),
      PCF: () => import("@/components/NF/nf/Pcf"),
      UDM: () => import("@/components/NF/nf/Udm"),
      UPF: () => import("@/components/NF/nf/Upf"),
      resultList: [],
      middleList: {
        AMF: 0,
        AUSF: 0,
        NRF: 0,
        NSSF: 0,
        PCF: 0,
        SMF: 0,
        UDM: 0,
        UDR: 0,
        UPF: 0,
        BSF: 0,
      },
      runAble:false
    }
  },
  methods: {
    generatedResultList() {
      // resultList 自己就会刷新 非常的神奇
      let tabSet = new Set();
      this.$Api.getIndex(this.userID).then((res) => {
        this.middleList = res.data;
      }).then(() => {
        for (let j in this.startList) {
          if (this.startList[j].number !== 0) {
            for (let i = 1; i < this.startList[j].number + 1; i++) {
              let nfName = this.startList[j].type + (this.middleList[this.startList[j].type] + i);
              // this.resultList.push({name: nfName,type: this.startList[j].type,status:"未配置",config:{}})
              this.resultList.push({name: nfName, type: this.startList[j].type, status: "未配置", config: {}})
              tabSet.add(this.startList[j].type)
            }
          }
        }
        this.tabList = Array.from(tabSet)
        this.activeType = this.tabList[0]
      })

    },
    dialogClose() {
      this.$emit("update:s_dialogFlag", false);
      this.reload()
    //   this.$router.replace({
    //     path:"/back",
    //     name:"back"
    //   })
    },
    getNF(name) {
      this.$Api.getNF(name, this.userID, this.activeType).then((res) => {
        for (let temp of this.resultList) {
          if (temp.name === name) {
            temp.config = res.data
          }
        }
      })
    },
    handleNext() {
      if (this.step++ > 1) this.step = 0;
      this.generatedResultList()
    },

    handleEdit(nfName) {
      this.activeName = nfName
      let that = this
      new Promise(function (resolve, reject) {
        for (let temp of that.resultList) {
          if (temp.name === nfName) {
            that.config = temp.config
            that.nfType = temp.type
          }
        }
        resolve(true)
      }).then((res) => {
        if (res === true) {
          this.innerVisible = true
        }
      })

    },
    runAll() {
      let that = this
      new Promise(function (resolve) {
        for (let nf of that.resultList) {
          that.$Api.saveNFConfig(nf.config, nf.name, that.userID)
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
        that.$emit("update:outerVisible", false)
      })
    },
    checkRunAble(){
      let fire = true;
      for (let nf of this.resultList){
        if (nf.status==="未配置"){
          fire = false
        }
      }
      return fire
    },

  },
  mounted() {
  },
  computed: {},
  watch: {
    outerVisible() {
      if (this.outerVisible === true) {
        this.state = this.stateList;
        this.nf = this.nfList;
        this.check = this.checkList
      } else {
        this.dialogClose()
      }

    },
    activeType() {
      this.tableData = this.tableData.slice(0, 0)
      for (let i in this.resultList) {
        if (this.resultList[i].type === this.activeType) {
          this.tableData.push({
            name: this.resultList[i].name,
            status: this.resultList[i].status,
            config: this.resultList[i].config
          })
        }
      }
    },
    config() {
      for (let temp of this.resultList) {
        if (temp.name === this.activeName) {
          temp.config = this.config
          if ((Object.keys(temp.config).length !== 0)) {
            temp.status = "已配置"
            this.runAble =  this.checkRunAble()
            this.tableData = this.tableData.slice(0, 0)
            for (let i in this.resultList) {
              if (this.resultList[i].type === this.activeType) {
                this.tableData.push({
                  name: this.resultList[i].name,
                  status: this.resultList[i].status,
                  config: this.resultList[i].config
                })
              }
            }
          }
        }
      }
    }

  }
}
</script>

<style scoped lang="less">
.title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
}

.label {
  font-size: 22px;
}
</style>
