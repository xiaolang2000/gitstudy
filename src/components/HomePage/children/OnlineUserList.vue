<template>
  <div>
    <span>基站列表：</span>
    <el-button v-for="item in gnbList" :key="item" @click="getUserList(item)" size="mini">基站{{item}}</el-button>
    <div style="float: right;">
      <el-input
          placeholder="搜索用户"
          v-model="search"
          style="width: 110px;"
          clearable
          @keyup.enter.native="handleFilter()"
      ></el-input>
      <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter()"
      >
        搜索
      </el-button>
    </div>

    <el-table
        :data="showTable"
        style="width: 100%;"
        stripe
        border
        highlight-current-row
        height="24vh"
    >

      <el-table-column type="index" width="30"></el-table-column>
      <el-table-column prop="gnb_id" label="基站ID" min-width="80" align="center">
      </el-table-column>
      <el-table-column prop="sim" label="sim" min-width="140" align="center">
      </el-table-column>
      <el-table-column prop="ipv4" label="ipv4" min-width="140" align="center">
      </el-table-column>

      <el-table-column prop="tai" label="tai" min-width="80" align="center">
      </el-table-column>
      <el-table-column prop="plmn" label="plmn" min-width="80" align="center">
      </el-table-column>
      <el-table-column prop="dnn" label="dnn" min-width="80" align="center">
      </el-table-column>
      <el-table-column prop="nssai" label="nssai" min-width="80" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="120" fixed="right">
        <template slot-scope="scope">
          <el-button size="medium" type="primary" icon="el-icon-view" @click="handleEdit(scope.row)" style="margin-right: 10%">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filterDataShow.length"
      >
      </el-pagination>
    </div>
    <sqlUserInfoRevise :s_dialog-flag.sync="f_dialogFlag" :onlineUser="editableData"></sqlUserInfoRevise>
  </div>

</template>

<script>
import sqlUserInfoRevise from "@/components/HomePage/Dialog/sqlUserInfoRevise";
export default {
  name: "OnlineUserList",
  components: {sqlUserInfoRevise},
  data() {
    return {
      f_dialogFlag: false,
      currentPage: 1,
      pageSize: 5,
      tableData: [], //原始表格数据
      search: "", // 搜索的关键字
      filterDataShow: [], //储存符合条件的数据
      name: "",
      editableData:{},
      gnbList:[]
    };
  },
  computed: {
    showTable() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      return this.filterDataShow.slice(start, end);
    }
  },
  mounted() {

    this.$Api.getGnb().then((res)=>{
      this.gnbList = res.data
      this.getUserList(this.gnbList[0]);
    })
  },
  methods: {
    getUserList(item) {
      this.$Api.getSqlUser(item).then((res) => {
        setTimeout(() => {
          this.filterDataShow = res.data;
          this.tableData = res.data;
        }, 100);
      })

    },
    handleEdit(item) {
      this.editableData = item;
      this.f_dialogFlag = true
    },
    handleCurrentChange(currentPage) {
      //当前页
      this.currentPage = currentPage;
    },
    handleSizeChange(val) {
      //每行显示数据条数
      this.pageSize = val;
    },
    handleFilter() {
      this.currentPage = 1;
      let filterKeyWords = this.search.trim();
      this.filterDataShow = this.tableData.filter((item) => {
        if (item.sim.includes(filterKeyWords)) {
          return item
        }
      });
    },
    handleDelete(scope) {
      let imsi = scope.row.imsi
      this.$Api.deleteSingleUser(imsi).then((res) => {
        console.log(res)
        let messageText = "删除用户" + imsi + "成功"
        if (res.data === true) {
          this.$message({
            message: messageText, type: 'success'
          });
        } else {
          messageText = "删除用户" + imsi + "失败"
          this.$message({
            message: messageText, type: 'error'
          });
        }
      })
      scope._self.$refs[`popover-${scope.$index}`].doClose();
      this.getUserList()
    },
    addSubscriber(){
      this.f_dialogFlag = true
    }
  },
  watch: {
    f_dialogFlag() {
      if (this.f_dialogFlag === false) {
      }
    }
  }
};
</script>

<style scoped lang="less">
.pagination{
  padding-left: 15%;
}


</style>
