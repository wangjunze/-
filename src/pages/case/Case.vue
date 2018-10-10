<template>
  <div id="a">
    <Header :activeIndex2="act"></Header>
    <div class="head">
      <span>购物车</span>
    </div>
    <div class="con">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column property="title" label="书名" width="150" align="center">
        </el-table-column>
        <el-table-column property="author" label="作者" width="120" align="center">
        </el-table-column>
        <el-table-column property="AuthorPress" label="出版社" width="150" align="center">
        </el-table-column>
        <el-table-column property="sellingPrice" label="售价" width="120" align="center">
        </el-table-column>
        <el-table-column label="数量" width="300" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="counts" @change="handleChange" :min="1" :max="15" label="描述文字"></el-input-number>
          </template>

        </el-table-column>
        <el-table-column label="支付" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary" @click="zf">支付</el-button>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="删除" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button type="danger" @click="del(scope.row)">删除</el-button>
            </el-row>
          </template>
        </el-table-column>

      </el-table>

    </div>
    <Footer></Footer>

  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  props: {},
  components: {
    Header,
    Footer
  },
  data: function () {
    return {
      act: "2",
      tableData: [],
      counts: 1
    };
  },
  methods: {
    del(x) {
      console.log(x);
      axios
        .post("/del", {
          item: x
        })
        .then(res => {
          console.log(res);
          this.getData();
        });
    },
    getData() {
      axios.get("/push").then(res => {
        console.log(res);
        console.log(res.data.data);

        this.tableData = res.data.data;
      });
    },
    zf() {
      this.$message({
        message: "支付成功",
        type: "success"
      });
    },
    handleChange(value) {
      console.log(value);
      for (var i = 0; i < this.tableData.length; i++) {
          console.log(this.tableData[i].count);
          
      }
    }
  },
  created() {
    this.getData();
  },
  beforeMount() {
    if (!sessionStorage.username) {
      location.href = "login.html";
    }
  }
}
</script>
<style scoped>
body {
  padding: 0;
  margin: 0;
}
.head {
  height: 50px;
  max-width: 980px;
  margin: 0 auto;
  line-height: 50px;
  background-color: #d3dce6;
  margin-top: 20px;
  padding-left: 15px;
  border-left: 5px solid #67c23a;
}
.con {
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>