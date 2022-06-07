<template>
  <div class="container">
    <el-row>
      <div class="header"><span>核心网管理平台</span></div>
    </el-row>
    <el-row>
      <el-col :span="10" offset="7">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span class="title">用户登陆</span>
          </div>
          <el-form :model="user" status-icon :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="userID">
              <el-input v-model.number="user.userID"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="user.passwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('user')">登陆</el-button>
              <el-button @click="resetForm('user')">重置</el-button>
            </el-form-item>
          </el-form>
          </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    var checkUserID = (rule, userID, callback) => {
      if (!userID) {
        return callback(new Error('账号不能为空'));
      }
      else
        callback();
    };
    return{
      user:{
        userID:"",
        passwd:""
      },
      rules: {
        userID: [
          { validator: checkUserID, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = new FormData();
          for (let key in this.user) {
            if (key != "confirm_passwd") {
              formData.append(key, this.user[key]);
            }
          }
          this.$Api.userLogin(formData).then((res)=>{
            let result = res.data;
            if (result==="用户不存在"){
              this.$message({
                message: result, type: 'error'
              });
            }
            else if(result ==="密码错误") {
              this.$message({
                message: result, type: 'error'
              });
            }
            else {
              this.$message({
                message: result, type: 'success'
              });
              this.$store.commit("set_userID",this.user.userID)
              console.log(this.user.userID)
              this.$router.push("/layout");
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  border-radius: 16px;
  margin: 2vh;
  height: 50vh;
  border: black 1px solid;
    .title{
      font-size: 30px;
      font-weight: bold;
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
