<template>
  <div>
    <el-button type="primary" icon="el-icon-circle-plus" @click="addSubscriber">注册新用户</el-button>
    <div style="float: right;">
      <el-input
          placeholder="搜索用户"
          v-model="search"
          style="width: 200px;"
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
      <el-table-column prop="imsi" label="imsi" min-width="140" align="center">
      </el-table-column>
      <el-table-column prop="security.amf" label="security.amf" min-width="140" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)" style="margin-right: 10%">编辑</el-button>
          <el-popover
              placement="top"
              width="250"
              v-model="scope.row.visible"
              :ref="`popover-${scope.$index}`"
          >
            <p><i class="el-icon-warning" style="color: red"></i>你确定要删除用户{{ scope.row.name }}吗？</p>
            <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="handleDelete(scope)">确定</el-button>
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popover>
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
    <userInfoRevise :s_dialog-flag.sync="f_dialogFlag" :subscribers="editableData"></userInfoRevise>
  </div>

</template>

<script>
import userInfoRevise from "@/components/HomePage/Dialog/userInfoRevise";

export default {
  name: "SubscriberList",
  components: {userInfoRevise},
  data() {
    return {
      f_dialogFlag: false,
      currentPage: 1,
      pageSize: 5,
      tableData: [], //原始表格数据
      search: "", // 搜索的关键字
      filterDataShow: [], //储存符合条件的数据
      name: "",
      editableData: {
            imsi: "",
            subscribed_rau_tau_timer: 12,
            network_access_mode: 2,
            subscriber_status: 0,
            access_restriction_data: 32,
            schema_version: 1,
            slice: [
              {
                sst: 1,
                default_indicator: true,
                session: [
                  {
                    name: "internet",
                    type: "3",
                    pcc_rule: [],
                    ambr: {
                      uplink: {
                        value: 1,
                        unit: 3
                      },
                      downlink: {
                        value: 1,
                        unit: 3
                      }
                    },
                    qos: {
                      index: 9,
                      arp: {
                        priority_level: 8,
                        pre_emption_capability: 1,
                        pre_emption_vulnerability: 1
                      }
                    }
                  }
                ]
              }
            ],
            ambr: {
              uplink: {
                value: 1,
                unit: 3
              },
              downlink: {
                value: 1,
                unit: 3
              }
            },
            security: {
              k: "00112233 44556677 8899AABB CCDDEEFF",
              amf: "8000",
              op: null,
              opc: "00010203 04050607 08090A0B 0C0D0E0F",
              sqn: 1089
            }

      }
      // editableData:{}
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
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$Api.getMongoUser().then((res) => {
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
        if (item.imsi.includes(filterKeyWords)) {
          return item
        }
      });
    },
    handleDelete(scope) {
      let imsi = scope.row.imsi
      this.$Api.deleteSingleUser(imsi).then((res) => {
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
        this.getUserList();
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
