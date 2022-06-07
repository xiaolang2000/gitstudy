<template>

</template>

<script>
export default {
  name: "Back.vue",
  data(){
    this.$router.replace({
      path:'/layout/home',
      name:'home'
    })
    return{}
  },
  mounted() {
    console.log("来过")
  }
}
</script>

<style scoped>

</style>
