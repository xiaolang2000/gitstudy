<template>

  <el-card class="box-card" shadow="hover">
    <div slot="header">
      <span  style="font-size: 20px;font-weight: bold;">用户列表</span>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="已注册的用户">
        <subscriber-list></subscriber-list>
      </el-tab-pane>
      <el-tab-pane label="在线的用户">
        <OnlineUserList></OnlineUserList>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import SubscriberList from "@/components/HomePage/children/SubscriberList";
import OnlineUserList from "@/components/HomePage/children/OnlineUserList";

export default {
  name: "UserList",
  components: {SubscriberList, OnlineUserList},
  data() {
    return {};
  },

};
</script>

<style scoped lang="less">
.box-card {
  border-radius: 16px;
  margin: 2vh;
  height: 50vh;
}


</style>
