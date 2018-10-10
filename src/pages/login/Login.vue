<template>
  <div class="deng">
    <div class="logo">
      <img src="/static/images/denglu.png" alt="" class="logoimg">
    </div>
    <div class="shuru">
      <el-form label-width="80px" :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-row>
        <el-button type="primary" @click="dl">登录</el-button>
        <el-button type="info" @click="reg">注册</el-button>
      </el-row>
    </div>
    <div style="color:red">{{ tip }}</div>
  </div>

</template>
<script>
export default {
  data: function() {
    return {
      form: {
        username: "",
        pwd: ""
      },
      tip: "",
      test: []
    };
  },
  methods: {
    dl() {
      var arr = this.test;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].username == this.form.username) {
          sessionStorage.username = this.form.username;
          sessionStorage.password = this.form.pwd;
          this.$message({
            message: "登录成功",
            type: "success"
          });
          this.tip = '';
          location.href = "home.html";
        } else if (this.form.username == "" || this.form.pwd == "") {
          this.tip = "用户名或密码不能为空！";
        } else {
          this.tip = '';
          this.$message.error("用户名或密码不正确，请注册后登录！");
        }
      }
    },
    reg() {
      var arr = this.test;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].username === this.form.username) {
          this.$message({
            message: "用户名已存在",
            type: "warning"
          });
          return;
        }
      }

      var form_data = new FormData();
      form_data.append("username", this.form.username);
      form_data.append("password", this.form.pwd);
      axios
        .post("/zhuc", form_data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          if (this.form.username == "" || this.form.pwd == "") {
            this.tip = "用户名或密码不能为空！";
          } else {
            this.tip = "";
            this.$message({
              message: "注册成功",
              type: "success"
            });
          }

          this.getusers();
        });
    },
    getusers() {
      this.test = [];
      axios.get("/dengl").then(res => {
        var users = res.data.data;
        users.map(v => {
          if (v.username) {
            this.test.push(v);
            console.log(this.test);
          }
        });
        //
      });
    }
  },
  created() {
    this.getusers();
  },
  beforeMount() {
    if (sessionStorage.username) {
      location.href = "home.html";
    }
  }
};
</script>
<style scoped>
body{
  padding: 0;
  margin: 0;
}
.deng {
  width: 100%;
  text-align: center;
  margin-top: 100px;
}
.logoimg {
  margin: 0 auto;
  width: 160px;
  display: inline-block;
  border: none;
  vertical-align: middle;
}
.shuru {
  width: 350px;
  margin: 0 auto;
  padding-right: 70px;
}
</style>

