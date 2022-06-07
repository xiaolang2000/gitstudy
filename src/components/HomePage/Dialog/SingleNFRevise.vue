<template>
  <el-dialog
      :visible.sync="innerVisible"
      :close-on-click-modal="false"
      @close="dialogClose"
      width="90%"
      style="height:100%;"
      title="修改配置信息"
      top="10"
      append-to-body
  >
    <div>
      <component :is="curComponent"  :innerVisible.sync="innerVisible" :form.sync="table" :user-i-d.sync="userID" :nfName.sync="nfName" :saveFlag.sync="saveFlag"></component>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: "SingleNFRevise",
  props: {
    innerVisible: false,
    userID: "",
    nfName: "",
    nfType:"",
    config:{}
  },
  inject: ["reload"],
  data() {
    return {
      // 传给配置页面的
      table: {},
      saveFlag:false,
      udr: () => import('@/components/HomePage/Dialog/children/Udr'),
      amf: () => import("@/components/HomePage/Dialog/children/Amf"),
      smf: () => import("@/components/HomePage/Dialog/children/Smf"),
      ausf: () => import( "@/components/HomePage/Dialog/children/Ausf"),
      bsf: () => import("@/components/HomePage/Dialog/children/Bsf"),
      nrf: () => import("@/components/HomePage/Dialog/children/Nrf"),
      nssf: () => import( "@/components/HomePage/Dialog/children/Nssf"),
      pcf: () => import("@/components/HomePage/Dialog/children/Pcf"),
      udm: () => import("@/components/HomePage/Dialog/children/Udm"),
      upf: () => import("@/components/HomePage/Dialog/children/Upf"),
    }
  },
  methods: {
    dialogClose() {
      // this.$emit("update:s_dialogFlag", false);
      // this.reload()
    },
  },
  mounted() {
  },
  computed: {
    curComponent() {
      return this.$data[String(this.nfType).toLowerCase()]
    }
  },
  watch: {
    innerVisible() {
      console.log(this.innerVisible)
      if (this.innerVisible===true){
        if((Object.keys(this.config).length!==0)){
          this.table = this.config
        }
        else {
          this.$Api.getNF(this.nfName, this.userID,this.nfType).then((res) => {
            this.table = res.data
          })
        }
      }
      else {
        if (this.saveFlag===true){
          this.saveFlag = false
          this.$emit("update:config",this.table)
        }
        this.$emit("update:innerVisible",false)
      }

    },
  }
}
</script>

<style scoped>

</style>
