<template>
  <div>
    <h3 >文章列表</h3>

    
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="id" width="80"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="name" label="分类"></el-table-column>
      <el-table-column prop="updatetime" label="更新时间"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="EditClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<style scoped>
h3 {
  margin-bottom: 20px;
}
.page-box {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>

<script>
import { getNewsList, typelist } from "../service/service.js";
import { dateFormate } from "../util.js";
let ins ;
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      
    };
  },
  methods: {
    
    getList() {
      console.log(1)
      getNewsList(
        {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        },
        res => {
          this.tableData = res.data.list || [];
          this.total = res.data.total || 0;
          this.tableData.forEach(c => {
            console.log(c.updatetime);
            c.updatetime = dateFormate(Number(c.updatetime));
          });
        }
      );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
    handleClick(item) {
      this.$router.push({
        name: "detail",
        query: {
          id: item.id
        }
      });
    },
    EditClick(item) {
      this.$router.push({
        name: "update",
        query: {
          id: item.id
        }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>