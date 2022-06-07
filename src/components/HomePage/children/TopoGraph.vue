<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header">
      <span>核心网结构图</span>
      <el-button type="primary" style="float: right;" @click="addNF" icon="el-icon-circle-plus">添加网元</el-button>
      <el-button type="danger" @click="initBatch1"  style="float: right;" icon="el-icon-remove-outline">删除网元</el-button>

    </div>
    <el-dialog title="目前处于运行状态的网元" :visible.sync="dialogVisible1" width="40%">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-table
              ref="multipleTable"
              :data="tableData"
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
                <el-tag size="medium" type="success" v-if="scope.row.status==='运行中'">{{ scope.row.status }}</el-tag>
                <el-tag size="medium" type="danger" v-if="scope.row.status==='停止中'">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="6">
          <el-button type="danger" @click="deleteAll">删除所选网元</el-button>
          <el-button type="primary" @click="dialogVisible1=false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <NFRevise :outer-visible.sync="outerVisible" :userID.sync="userID" :nf-list="nfList" :state-list="nfState"
              :check-list="check"></NFRevise>
    <div :id=this.key style=" height: 40vh; width: 100%; border: black solid 1px;"></div>
  </el-card>
</template>

<script>
import NFRevise from "@/components/HomePage/Dialog/NFRevise";
import {EventBus} from "@/eventBus/eventBus";
import Back from "@/views/Back";
import amfIcon from "/public/static/normal/amf.png"
import ausfIcon from "/public/static/normal/ausf.png"
import bsfIcon from "/public/static/normal/bsf.png"
import nrfIcon from "/public/static/normal/nrf.png"
import nssfIcon from "/public/static/normal/nssf.png"
import pcfIcon from "/public/static/normal/pcf.png"
import smfIcon from "/public/static/normal/smf.png"
import udmIcon from "/public/static/normal/udm.png"
import udrIcon from "/public/static/normal/udr.png"
import upfIcon from "/public/static/normal/upf.png"

export default {
  name: "structView",
  components: {NFRevise},
  props: {
    rawList: [],
    flag: ''
  },
  inject: ['reload'],
  data() {
    return {
      dialogVisible1:false,
      tableData:[],
      selectedTableData:[],
      key: 'topo',
      linkData: [],
      nodeData: [],
      outerVisible: false,
      nfState: [],
      nfList: [],
      check: [],
      userID: "",
      //画图相关的变量

      detailData: {},
      myChart: {},
      icon: {
        "amf": amfIcon,
        "nrf": nrfIcon,
        "smf": smfIcon,
        "upf": upfIcon,
        "udm": udmIcon,
        "nssf": nssfIcon,
        "ausf": ausfIcon,
        "pcf": pcfIcon,
        "udr": udrIcon,
        "bsf": bsfIcon,
      },
      staticNodes: [
        //第一行
        {
          name: "NSSF",
          x: 0,
          y: 0,
          symbol: "image://" + nssfIcon,
          symbolSize: [60, 60],
          fixed: true
        },
        {
          name: "BSF",
          x: 200,
          y: 0,
          symbol: "image://" + bsfIcon,
          symbolSize: [60, 60],
          fixed: true
        },
        {
          name: "NRF",
          x: 400,
          y: 0,
          symbol: "image://" + nrfIcon,
          symbolSize: [60, 60],
          fixed: true
        },
        {
          name: "PCF",
          x: 600,
          y: 0,
          symbol: "image://" + pcfIcon,
          symbolSize: [60, 60],
          fixed: true
        },
        {
          name: "UDM",
          x: 800,
          y: 0,
          symbol: "image://" + udmIcon,
          symbolSize: [60, 60],
          fixed: true
        },

        //第二行
        {
          name: "Nnssf",
          label: { //线上面显示内容
            show: false,
            position: "top",
            formatter: "Nnssf",
            fontSize: 15,
          },
          x: 0,
          y: 100,
          symbolSize: 5,
          fixed: true
        },
        {
          name: "Nausf",
          label: { //线上面显示内容
            show: false,
            position: "bottom",
            formatter: "Nausf",
            fontSize: 15,
          },
          position: "top",
          x: 100,
          y: 100,
          symbolSize: 5,
          fixed: true
        },
        {
          name: "Nbsf",
          label: { //线上面显示内容
            show: false,
            position: "top",
            formatter: "Nbsf",
            fontSize: 15,
          },
          x: 200,
          y: 100,
          symbolSize: 5,
          fixed: true
        },
        {
          name: "Namf",
          label: { //线上面显示内容
            show: false,
            position: "bottom",
            formatter: "Namf",
            fontSize: 15,
          },
          x: 300,
          y: 100,
          symbolSize: 5,
          fixed: true
        },
        {
          name: "Nnrf",
          label: { //线上面显示内容
            show: false,
            position: "top",
            formatter: "Nnrf",
            fontSize: 15,
          },
          x: 400,
          y: 100,
          symbolSize: 5,
          fixed: true
        },
        {
          name: "Nsmf",
          label: { //线上面显示内容
            show: false,
            position: "bottom",
            formatter: "Nsmf",
            fontSize: 15,
          },
          x: 500,
          y: 100,
          symbolSize: 5,
          fixed: true
        },
        {
          name: "Npcf",
          label: { //线上面显示内容
            show: false,
            position: "top",
            formatter: "Npcf",
            fontSize: 15,
          },
          x: 600,
          y: 100,
          symbolSize: 5,
          fixed: true
        },
        {
          name: "Nudm",
          label: { //线上面显示内容
            show: false,
            position: "top",
            formatter: "Nudm",
            fontSize: 15,
          },
          x: 800,
          y: 100,
          symbolSize: 5,
          fixed: true
        },
        {
          name: "Upfm",
          label: { //线上面显示内容
            show: false,
            position: "top",
            formatter: "Upfm",
            fontSize: 15,
          },
          x: 700,
          y: 100,
          symbolSize: 5,
          fixed: true
        },
        {
          name: "Udrm",
          label: { //线上面显示内容
            show: false,
            position: "top",
            formatter: "Udrm",
            fontSize: 15,
          },
          x: 900,
          y: 100,
          symbolSize: 5,
          fixed: true
        },

        //第三行
        {
          name: "AUSF",
          x: 100,
          y: 200,
          symbol: "image://" + ausfIcon,
          symbolSize: [60, 60],
          fixed: true
        },
        {
          name: "AMF",
          x: 300,
          y: 200,
          symbol: "image://" + amfIcon,
          symbolSize: [60, 60],
          fixed: true
        },
        {
          name: "SMF",
          x: 500,
          y: 200,
          symbol: "image://" + smfIcon,
          symbolSize: [60, 60],
          fixed: true
        },
        {
          name: "UPF",
          x: 700,
          y: 200,
          symbol: "image://" + upfIcon,
          symbolSize: [60, 60],
          fixed: true
        },
        {
          name: "UDR",
          x: 900,
          y: 200,
          symbol: "image://" + udrIcon,
          symbolSize: [60, 60],
          fixed: true
        },

      ],
      // 线
      staticLinks: [
        {
          source: "Nnssf",
          target: "Udrm",
          lineStyle: {
            color: "#0c0916",
            width: 5,
          },
          show: false
        },
        {
          source: "Nnssf",
          target: "NSSF",
          lineStyle: {
            color: "#0c0916",
            width: 1,
          },
        },
        {
          source: "UPF",
          target: "Upfm",
          lineStyle: {
            color: "#0c0916",
            width: 1,
          },
        },
        {
          source: "UDR",
          target: "Udrm",
          lineStyle: {
            color: "#0c0916",
            width: 1,
          },
        },
        {
          source: "AUSF",
          target: "Nausf",
          lineStyle: {
            color: "#0c0916",
            width: 1,
          },
        },
        {
          source: "BSF",
          target: "Nbsf",
          lineStyle: {
            color: "#0c0916",
            width: 1,
          },
        },
        {
          source: "AMF",
          target: "Namf",
          lineStyle: {
            color: "#0c0916",
            width: 1,
          },
        },
        {
          source: "NRF",
          target: "Nnrf",
          lineStyle: {
            color: "#0c0916",
            width: 1,
          },
        },
        {
          source: "SMF",
          target: "Nsmf",
          lineStyle: {
            color: "#0c0916",
            width: 1,
          },
        },
        {
          source: "PCF",
          target: "Npcf",
          lineStyle: {
            color: "#0c0916",
            width: 1,
          },
        },
        {
          source: "UDM",
          target: "Nudm",
          lineStyle: {
            color: "#0c0916",
            width: 1,
          },
        },

      ],
      category: [{
        name: "running",
        label: {show: true, position: 'inside', fontSize: 14, color: 'white'},
        symbol: 'Rect',
        itemStyle: {color: "#67C23A"}
      }, {
        name: "stop",
        label: {show: true, position: 'inside', fontSize: 14, color: 'white'},
        symbol: 'Rect',
        itemStyle: {color: "#F56C6C"}
      }]
    }
  },
  methods: {
    initBatch1(){
      this.dialogVisible1 = true
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
            this.tableData.push({name:key,status:'停止中',type:type})
          }else {
            this.tableData.push({name:key,status:'运行中',type:type})
          }
        })
      })
    },
    handleSelectionChange(val) {
      this.selectedTableData = val;
    },
    addNF() {
      this.outerVisible = true
      // this.$emit("update:flag", true)
      this.$Api.init(this.userID).then((res)=>{
        this.setState(res.data.nfList)
      })
    },
    setState(nfList) {
      let i = 0
      this.nfState = this.nfState.slice(0, 0)
      this.nfList = this.nfList.slice(0, 0)
      this.check = nfList
      for (const key in nfList) {
        this.nfList.push(key)
        this.nfState.push(nfList[key].toString())
        i += 1
      }
    },

    myEcharts() {
      let that = this
      //配置图表
      let option = {
        title: {},
        tooltip: {
          show: false,
        },
        series: [{
          type: "graph", //关系图
          layout: "force", // 图的布局 'none' 不采用任何布局，使用节点中提供的 x， y 作为节点的位置。
          // 'circular' 采用环形布局;'force' 采用力引导布局.
          force: {
            layoutAnimation: true,
            xAxisIndex: 0, //x轴坐标 有多种坐标系轴坐标选项
            yAxisIndex: 0, //y轴坐标
            gravity: 0.001,  //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
            edgeLength: 80,  //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
            repulsion: 60  //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
          },
          zoom: 0.7,
          center: [450, 100],
          symbolSize: [60, 30],
          roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          color: "#ea9f7a",
          lineStyle: {color: 'source', width: 2},
          categories: this.category,
          data: this.nodeData,
          links: this.linkData
        }]
      }
      this.myChart.setOption(option);
      this.myChart.on("click", function (param) {
        let str = param.name
        for (let i in str) {
          let asc = str.charCodeAt(i);
          if (asc >= 48 && asc <= 57) {
            EventBus.$emit("nf", param.name)
            EventBus.$emit("state", that.check[param.name])
          }
        }
      })

    },
    deleteAll(){
      this.$store.commit("delete_nfSwitch")
      let that = this
      new Promise(function (resolve) {
        for (let nf of that.selectedTableData) {
          that.$Api.deleteNF(nf.name,that.userID).then((res) => {
              that.$message.success("删除" + nf.name + "成功！")
          })
        }
        resolve()
      }).then((resolve) => {
        that.dialogVisible1 = false
        this.reload()
      })
    },

  },

  mounted() {
    this.userID = this.$store.getters.get_userID
    console.log("触发了结构图初始化")
    this.$Api.init(this.userID).then((res) => {
      this.setState(res.data.nfList)
    }).then(() => {
      this.linkData = this.linkData.slice(0, 0)
      this.nodeData = this.nodeData.slice(0, 0)
      this.nodeData = this.nodeData.concat(this.staticNodes)
      this.linkData = this.linkData.concat(this.staticLinks)
      for (let key in this.nfList) {
        if (this.check[this.nfList[key]] === "stop") {
          this.nodeData.push({name: this.nfList[key], category: 1})
        } else {
          this.nodeData.push({name: this.nfList[key], category: 0})
        }
        let type = ""
        for (let i in this.nfList[key]) {
          let asc = this.nfList[key].charCodeAt(i)
          if (asc >= 65 && asc <= 90) {
            type = type + this.nfList[key].charAt(i)
          }
        }

        this.linkData.push({source: this.nfList[key].toUpperCase(), target: type})
      }
      this.myChart = this.$echarts.init(document.getElementById(this.key));
      this.myChart.off('click')
      this.myEcharts()
    })

  },
  watch: {
    deep: true,
    f_dialogFlag() {
      if (this.outerVisible === false) {
        this.$emit("update:flag", true)
      }
    },
    // rowList() {
    //   this.setState(this.rowList)
    // }
  }
}
</script>

<style scoped lang="less">
.box-card {
  margin: 2vh;
  height: 50vh;
  border-radius: 16px;

  span {
    font-size: 20px;
    font-weight: bold;
  }

  #topo {
    height: 40vh;
    width: 100%;
    border: black solid 1px;
  }
}
</style>
