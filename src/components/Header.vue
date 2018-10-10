<template>
  <div class="hello">
    
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <img src="/static/images/shouye.png" alt="">
    <el-menu-item index="1" class="shouye">

      <a href="home.html">首页</a>
      </el-menu-item>
    <el-menu-item index="2">
      <a href="case.html">购物车</a>
      </el-menu-item>
    <el-menu-item index="3">
      <a href="company.html">书籍详情</a>
      </el-menu-item>
    <el-menu-item index="4">
      <a href="news.html">图书上架</a>
    </el-menu-item>

    <el-submenu index="5">
      <template slot="title" ><a href="products.html">个人中心</a></template>
      <el-menu-item index="5-1" @click="person">个人资料</el-menu-item>
      <el-menu-item index="5-2">购买记录</el-menu-item>
      <el-menu-item index="5-3">退出登录</el-menu-item>
    </el-submenu>
  </el-menu> 
  
</div>
</template>

<script>
export default {
  props:{
      activeIndex2:{
        type:String,
        default:"1"
      }
  },
  data() {
    return {
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    person(){
      location.href = "products.html"
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
  padding: 0;
  margin: 0;
}
.hello {
  width: 100%;
  height: 60px;
  background-color: rgb(84, 92, 100);
}

.el-menu--horizontal{
    margin: 0 auto;
    /* max-width: 1000px; */
    max-width: 1000px;
    position: relative;
}
.el-menu-item{
   padding: 0px 16px;
}

a {
  display: inline-block;
  text-decoration: none;
}

.el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
    min-width: 116px;
    text-align: center;
}

.el-menu--horizontal>.el-submenu .el-submenu__title a{
  color: #fff;
}

.el-menu--horizontal > .shouye {
  margin-left: 66px;
}

img{
  position: absolute;
  width: 37px;
  height: 37px;
  top: 15px;
  left:  15px;

}

</style>
