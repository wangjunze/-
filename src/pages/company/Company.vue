<template>
  <div id="a">
    <Header :activeIndex2="act"></Header>

    <div class="head">
      <span>书籍详情</span>
    </div>
    <div class="content">
      <div class="images">
        <img :src="particulars.src" alt="">
      </div>
      <table class="tab" border="1">
        <tr>
          <td class="t1">书名</td>
          <td class="t2">{{ particulars.title }}</td>
        </tr>
        <tr>
          <td class="t1">作者</td>
          <td class="t2">{{ particulars.author }}</td>
        </tr>
        <tr>
          <td class="t1">出版社</td>
          <td class="t2">{{ particulars.AuthorPress }}</td>
        </tr>
        <tr>
          <td class="t1">出版时间</td>
          <td class="t2">{{ particulars.publicationTime }}</td>
        </tr>
        <tr>
          <td class="t1">图书售价</td>
          <td class="t2">{{ particulars.sellingPrice }}</td>
        </tr>
        <tr>
          <td class="t1">ISBD</td>
          <td class="t2">{{ particulars.serial }}</td>
        </tr>
        <tr>
          <td class="t1">内容摘要</td>
          <td class="t2">{{ particulars.desc }}</td>
        </tr>
        <tr>
          <td class="t1"></td>
          <td class="t2">
            <el-row>
              <el-button type="success" @click="purchase">立即购买</el-button>
              <el-button type="primary" plain @click="addition(particulars)">添加到购物车</el-button>
            </el-row>
          </td>
        </tr>
      </table>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  props: {
    activeIndex: "3"
  },
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      act: "3",
      particulars: {
        title: "",
        author: "",
        AuthorPress: "",
        publicationTime: "",
        serial: "",
        sellingPrice: "",
        desc: ""
      }
    };
  },
  methods: {
    addition(x) {
      console.log(x);
      axios
        .post("/add", {
          data: x
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "加入购物车成功",
            type: "success"
          });
          setTimeout(function() {
            location.href = "case.html";
          }, 1500);
        });
    },
    purchase() {
      this.$message({
        message: "购买成功",
        type: "success"
      });
    },
    getdata() {
      var self = this;
      var part = location.href.split("?")[1];
      axios.get("/getdata").then(res => {
        console.log(res);
        console.log(res.data.data);
        var par = res.data.data;
        par.map(v => {
          if (v.serial == part) {
            self.particulars = v;
            console.log(v);
          }
        });
      });
    }
  },
  beforeMount() {
    if (!sessionStorage.username) {
      location.href = "login.html";
    }

    var benye = location.href.split("?")[1];
    if (!benye) {
      this.$message({
        message: "没有图书信息，返回首页！",
        type: "warning"
      });

      setTimeout(function() {
        location.href = "home.html";
      }, 1500);
    }
  },
  created() {
    this.getdata();
  }
};
</script>
<style scoped>
body{
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
.content {
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 30px;
}
.images {
  margin: 0 auto;
  text-align: center;
}

.images img {
  width: 200px;
  height: 260px;
}

.tab {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #d3dce6;
}

.tab .t1 {
  width: 30%;
  padding-left: 20px;
  height: 50px;
}

.tab .t2 {
  width: 70%;
  height: 50px;
  padding-left: 20px;
}

.el-button--success {
  padding: 12px 35px;
}
</style>