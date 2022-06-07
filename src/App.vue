<template>
  <div id=" app">
    <router-view v-if='isRouterAlive'/>
  </div>
</template>
<script>
import {EventBus} from "@/eventBus/eventBus";

export default {
  name: 'App',
  data(){
    return{
      isRouterAlive:true
    }
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  mounted() {
  },
  methods: {
    reload () {
      console.log("刷新页面")
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }}
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
