<template>
  <el-card class="box-card" shadow="hover">

    <el-row :style="{height:'50px'}">
      <el-col :span="5">
<!--        <div slot="header">-->
          <span style="font-size: 20px;font-weight: bold;">核心网数据统计</span>
<!--        </div>-->
      </el-col>
      <el-col :span="3" :offset="13">
        <button @click="start">实时获取</button>
      </el-col>
      <el-col :span="3" >
        <button @click="stop">停止获取</button>
      </el-col>
    </el-row>


<!--      <button @click="stop">停止获取</button>-->

    <div id="myChart" :style="{width: '100%', height: '300px'}"></div>

  </el-card>
</template>

<script>

export default {
  name: "EchartsView",
  data() {
    return {
      dataList1: [{ value: 20, name: '占用资源' },{ value: 100, name: '剩余资源' }],
      dataList2: [
          { value: 104, name: 'AUSF' },
          { value: 135, name: 'NSSF' },
          { value: 110, name: 'BSF' },
          { value: 151, name: 'AMF' },
          { value: 234, name: 'NRF' },
          { value: 147, name: 'SMF' },
          { value: 135, name: 'PCF' },
          { value: 102, name: 'UDM' },
          { value: 100, name: 'UDR' }
      ],
      timer: null,
      option: null,
      myChart: null,
    }
  },
  mounted() {
    this.drawLine();


  },
  methods: {
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      this.option={
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          data: [
            'NSSF',
            'BSF',
            'NRF',
            'PCF',
            'AUSF',
            'AMF',
            'SMF',
            'UDM',
            'UDR'
          ]
        },
        series: [
          {
            name: '总体资源使用情况',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              position: 'inner',
              fontSize: 14
            },
            labelLine: {
              show: false
            },
            data: this.dataList1,
          },

          {
            name: '网元资源使用情况',
            type: 'pie',
            radius: ['45%', '60%'],
            labelLine: {
              length: 30
            },
            label: {
              formatter: '{b|{b}：}{d|{d}%}  ',
              backgroundColor: '#F6F8FC',
              borderColor: '#8C8D8E',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: '#6E7079',
                  lineHeight: 22,
                  align: 'center'
                },
                hr: {
                  borderColor: '#8C8D8E',
                  width: '100%',
                  borderWidth: 1,
                  height: 0
                },
                b: {
                  color: '#4C5058',
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 33
                },
                per: {
                  color: '#fff',
                  backgroundColor: '#4C5058',
                  padding: [3, 4],
                  borderRadius: 4
                }
              }
            },
            data: this.dataList2
          }

        ]
      }
      this.myChart.setOption(this.option);
    },
    start(){
      this.timer = setInterval(()=>{
        // this.myChart.dispose();
        // this.showEcharts();
        this.dataList1[0].value = parseInt(20*Math.random());
        this.dataList2[0].value = parseInt(20*Math.random());
        this.myChart.setOption(this.option);
      },900)
    },
    stop() {
      clearInterval(this.timer);
    }


  }
}

</script>


<style scoped lang="less">
.box-card {
  margin: 0 2vh 1vh 2vh;
  height: 35vh;
  border-radius: 16px;
}
</style>
