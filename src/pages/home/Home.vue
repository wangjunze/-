<template>
  <div id="a">
    <Header :activeIndex2="act"></Header>
    <div class="b">
      <el-carousel indicator-position="outside" class="a2" height="230px">
        <el-carousel-item v-for="(list,i) in list" :key="'a'+i" v-if="list.zhanshi == 'true'" class="a1">
          <div class="c">
            <div class="tupian">
              <img :src="list.src" alt="" @click="xq(list)">
            </div>
              <div class="shuju">
                <div>
                  <span>书名 : {{ list.title }}</span>
                </div>
                <div>
                  <span>作者 : {{ list.author }}</span>
                </div>

                <div>
                  <span>价格 : {{ list.sellingPrice }}</span>
                </div>

              </div>

            </div>

        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="content">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(list,i) in list" :key="i" >
          <div class="grid-content bg-purple" >
            <div class="img">
              <img :src="list.src" alt="" @click="detail(list)">
            </div>
              <div class="introduct">
                <span>书名 : {{ list.title }}</span>
              </div>
              <div class="introduct">
                <span>作者 : {{ list.author }}</span>
              </div>
              <div class="introduct">
                <span>出版社 : {{ list.AuthorPress }}</span>
              </div>
              <div class="introduct">
                <span>价格 : {{ list.sellingPrice }}</span>
              </div>
              <div class="jiaru">
                <el-row>
                  <el-button type="primary" plain @click="add(list)">加入购物车</el-button>
                </el-row>
              </div>
            </div>

        </el-col>

      </el-row>
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
      act: "1",
      list: {
        title: "",
        author: "",
        AuthorPress: "",
        sellingPrice: "",
        desc: "",
        src: "",
        zhanshi: true
      }
    };
  },
  methods: {
    getdata() {
      axios.get("/getdata").then(res => {
        var arr = res.data.data;
        var b = arr.length;
        arr.reverse();

        console.log(arr);

        this.list = arr;
      });
    },
    add(x) {
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
          setTimeout(function () {
            location.href = "case.html";
          }, 1500);
        });
    },
    detail(x) {
      location.href = "company.html?" + x.serial;
    },
    xq(x) {
      location.href = "company.html?" + x.serial;
    }
  },
  created() {
    this.getdata();
  },
  beforeMount() {
    if (!sessionStorage.username) {
      location.href = "login.html";
    }
  }
};
</script>
<style scoped>
body{
  padding: 0;
  margin: 0;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 153px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel {
  margin: 0 auto;
  max-width: 1000px;
  margin-top: 20px;
}

.el-carousel__item {
  background-image: url("/static/images/bg4.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

.chuan {
  width: 100%;
  height: 100%;
}
.c {
  display: flex;
}
.tupian {
  flex: 0.5;
  text-align: right;
  padding-top: 30px;
}

.tupian img {
  width: 140px;
  height: 155px;
}
.tupian img:hover {
  animation: memoir 3s linear infinite;
}
@keyframes memoir {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
.shuju {
  flex: 0.3;
  padding-top: 65px;
  text-align: left;
  padding-left: 143px;
  font-size: 18px;
}
.content {
  margin: 0 auto;
  max-width: 1000px;
  max-height: 623px;
  margin-top: 10px;
  overflow: hidden;
  overflow-y: auto;
}

.el-row {
  margin-bottom: 2px;
}

.el-col {
  border-radius: 4px;
  margin-bottom: 10px;
}

.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  box-shadow: 5px 5px 5px #475669;
  padding-bottom: 10px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.img {
  height: 135px;
  text-align: center;
  padding-top: 10px;
}

.img img {
  width: 130px;
  height: 130px;
}
.img img:hover {
  animation: memoir 3s linear infinite;
}
.introduct {
  padding-left: 10px;
  font-size: 13px;
}
.jiaru {
  margin-top: 8px;
  text-align: center;
}
</style>