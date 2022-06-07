<template>
  <el-dialog
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="dialogClose"
      width="90%"
      style="height:100%;"
      title="修改配置信息"
      top="10"
  >
    <div>
      <component :is="curComponent" :son_visible.sync="visible" :form.sync="config" :user-i-d.sync="userID" :nfName="nfName" :nfType="nfType"></component>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "ControlRevise",
  props: {
    s_dialogFlag: false,
    userID: "",
    nfName: "",
    nfType:""
  },
  inject: ["reload"],
  data() {
    return {
      visible: false,
      config: {},
      udr: () => import('@/components/NF/nf/Udr'),
      amf: () => import("@/components/NF/nf/Amf"),
      smf: () => import("@/components/NF/nf/Smf"),
      ausf: () => import( "@/components/NF/nf/Ausf"),
      bsf: () => import("@/components/NF/nf/Bsf"),
      nrf: () => import("@/components/NF/nf/Nrf"),
      nssf: () => import( "@/components/NF/nf/Nssf"),
      pcf: () => import("@/components/NF/nf/Pcf"),
      udm: () => import("@/components/NF/nf/Udm"),
      upf: () => import("@/components/NF/nf/Upf"),
    }
  },
  methods: {
    dialogClose() {
      this.$emit("update:s_dialogFlag", false);
      this.reload()
    },
  },
  mounted() {

  },
  computed: {
    curComponent() {
      return this.$data[this.nfType.toLowerCase()]
    }
  },
  watch: {
    s_dialogFlag() {
      this.visible = this.s_dialogFlag;
      // this.name = this.nfName
      this.$Api.getNF(this.nfName, this.userID,this.nfType).then((res) => {
        this.config = res.data
      })
    },
    visible() {
      if (this.visible == false)
        this.dialogClose();
    }
  }
}
</script>

<style scoped>

</style>
