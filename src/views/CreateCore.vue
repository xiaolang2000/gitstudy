<template>
  <div class="container">
    <el-row>
      <div class="header"><span>核心网管理平台</span></div>
    </el-row>
    <el-row>
      <el-col :span="16" offset="4">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span class="title">选择要管理的核心网</span>
            <el-button type="primary" style="float: right;" @click="dialogVisible = true">新建核心网</el-button>
          </div>


          <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
            <span>选择在哪个物理设备上新建核心网</span>
            <div>
              <el-radio v-model="radio1" label="1" border>10.100.101.111（鸿通楼服务器）</el-radio>
            </div>
            <div><el-radio v-model="radio1" label="2" border>39.100.101.111（远端服务器）</el-radio></div>
            <div>
              <span>核心网名称</span>
              <el-input v-model="coreName" maxlength="20" placeholder="输入核心网的名字"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">在该设备上新建核心网</el-button>
  </span>
          </el-dialog>

          <div class="scroll">
            <el-descriptions class="margin-top" title="鸿通楼核心网1" :column="2" :size="size" border>
              <template slot="extra">
                <el-button type="primary">进入管理</el-button>
              </template>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>

                  核心网名称
                </template>
                鸿通楼核心网1
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-location-outline"></i>
                  核心网所在设备IP
                </template>
                10.100.101.111
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  当前在线的用户数
                </template>
                2
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  当前运行的网元数
                </template>
                10
              </el-descriptions-item>
            </el-descriptions>
            <el-divider></el-divider>
            <el-descriptions class="margin-top" title="鸿通楼核心网2" :column="2" :size="size" border>
              <template slot="extra">
                <el-button type="primary">进入管理</el-button>
              </template>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>

                  核心网名称
                </template>
                鸿通楼核心网2
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-location-outline"></i>
                  核心网所在设备IP
                </template>
                10.100.101.111
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  当前在线的用户数
                </template>
                2
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  当前运行的网元数
                </template>
                10
              </el-descriptions-item>
            </el-descriptions>
            <el-divider></el-divider>
            <el-descriptions class="margin-top" title="远端核心网1" :column="2" :size="size" border>
              <template slot="extra">
                <el-button type="primary">进入管理</el-button>
              </template>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>

                  核心网名称
                </template>
                远端核心网1
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-location-outline"></i>
                  核心网所在设备IP
                </template>
                39.100.101.111
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  当前在线的用户数
                </template>
                2
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  当前运行的网元数
                </template>
                10
              </el-descriptions-item>
            </el-descriptions>
            <el-divider></el-divider>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "SelectCore",
  data(){
    return{
      radio1:1,
      dialogVisible: false,
      coreName:"",
      user:{
        userID:"",
        passwd:"",

      },
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  border-radius: 16px;
  margin: 2vh;
  height:80vh;
  border: black 1px solid;
  .title{
    font-size: 30px;
    font-weight: bold;
  }
  .scroll{
    height:100%;
    overflow:auto;
  }
}

.header {
  width: 100%;
  height: 6vh;
  text-align: center;
  background-color: #2c3e50;
  padding-top: 2vh;
  span {
    font-size: 20px;
    color: white;
  }
  .el-menu-demo{
  }
}


</style>
