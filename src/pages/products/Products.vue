<template>
  <div id="a">
    <Header :activeIndex2="act"></Header>
    <div class="container">
      <div class="background">
        <div class="photo">
          <img :src="images" alt="">
        </div>
        <div class="name">
          <span>{{ username }}</span>
        </div>
      </div>

      <div class="head">
        <span>个人资料</span>
      </div>
      <el-form status-icon :model="form" label-width="100px" class="demo-ruleForm" style="width:1000px">
        <el-form-item label="上传头像">
          <el-upload class="avatar-uploader" ref="upload" :auto-upload="false" action="" :show-file-list="false" accept="image/png,image/jpeg,image/jpg" :on-change="file_change">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input type="text" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input type="text" v-model="form.specialty"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input type="text" v-model="form.class"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
          <el-radio v-model="form.sex" label="保密">保密</el-radio>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sub">修改</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>

    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      act: "5",
      imageUrl: "",
      images: "",
      username: "",
      form: {
        preimage: "",
        name: "",
        specialty: "",
        class: "",
        sex: "",
        file: ""
      }
    };
  },
  beforeCreate() {
    if (!sessionStorage.username) {
      location.href = "login.html";
    }
  },
  beforeMount() {
    this.username = sessionStorage.username;
    this.getshuju();
  },
  methods: {
    file_change(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.form.preimage);
      this.form.preimage = file.url;
      console.log(file);
      this.form.file = file.raw;
    },
    getshuju() {
      axios
        .post("/getuser", {
          username: this.username
        })
        .then(res => {
          var data = res.data.data[0];
          console.log(data);
          this.images = data.img;
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const element = data[key];
              if (element) {
                this.form[key] = element;
              }
            }
          }
        });
    },
    open2() {
      this.$message({
        message: "修改个人资料成功！",
        type: "success"
      });
    },
    sub() {
      var user_form = new FormData();
      user_form.append("name", this.form.name);
      user_form.append("specialty", this.form.specialty);
      user_form.append("class", this.form.class);
      user_form.append("sex", this.form.sex);
      user_form.append("img", this.form.file);
      user_form.append("username", this.username);
      axios
        .post("/userform", user_form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.open2();
          if (this.form.preimage) {
            this.images = this.form.preimage;
          } else {
            this.getshuju();
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
body{
  padding: 0;
  margin: 0;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
}
.background {
  width: 100%;
  background-color: rgb(23, 179, 179);
  line-height: 260px;
  padding: 60px 0px;
}
.photo {
  width: 160px;
  height: 160px;
  border-radius: 50% 50%;
  background-color: #eee;
  margin: 0 auto;
}
.photo img {
  width: 160px;
  height: 160px;
  display: block;
  border-radius: 50% 50%;
}
.name {
  height: 30px;
  text-align: center;
}
.name span {
  color: #eee;
  font-size: 16px;
  font-weight: bold;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.background {
  line-height: 72px;
}


</style>
