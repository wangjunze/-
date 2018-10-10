<template>
  <div id="a">

    <Header :activeIndex2="act"></Header>
    <div class="head">
      <span>图书上架</span>
    </div>
    <div class="det">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="书名" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入书名"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="ruleForm.author" placeholder="请输入作者"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="AuthorPress">
          <el-input v-model="ruleForm.AuthorPress" placeholder="请输入出版社"></el-input>
        </el-form-item>
        <el-form-item label="出版时间" prop="publicationTime">
          <el-input v-model="ruleForm.publicationTime" placeholder="请输入出版时间"></el-input>
        </el-form-item>
        <el-form-item label="ISBN编号" prop="serial">
          <el-input v-model="ruleForm.serial" placeholder="请输入ISBN编号"></el-input>
        </el-form-item>
        <el-form-item label="售价" prop="sellingPrice">
          <el-input v-model="ruleForm.sellingPrice" placeholder="请输入售价"></el-input>
        </el-form-item>

        <el-form-item label="图书分类" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择分类">
            <el-option label="Java" value="Java"></el-option>
            <el-option label="Html" value="Html"></el-option>
            <el-option label="Css" value="Css"></el-option>
            <el-option label="科学" value="科学"></el-option>
            <el-option label="激进" value="激进"></el-option>
            <el-option label="娱乐" value="娱乐"></el-option>
            <el-option label="体育" value="体育"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="内容概要" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="是否展示" prop="zhanshi">
          <el-switch v-model="ruleForm.zhanshi" active-color="#13ce66" inactive-color="#ff4949" :on-change="zhanshi(v)">
          </el-switch>
        </el-form-item>

        <el-row :gutter="20">
          <el-col class="left" :span="4">
            <el-form-item label="图书封面">
            </el-form-item>
          </el-col>
          <el-col :xs="10" :sm="10" :md="20" :lg="20" :xl="20">
            <div class="grid-content bg-purple">
              <!-- 文件上传 -->
              <el-upload class="upload-demo" ref="upload" multiple :limit='1' :on-preview="handlePreview" :on-remove="handleRemove" :on-exceed="chaochushi" action="" :on-change="change" :file-list="ruleForm.fileList" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
              </el-upload>
            </div>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
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
  props: {},
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      act: "4",
      ruleForm: {
        title: "",
        author: "",
        AuthorPress: "",
        publicationTime: "",
        serial: "",
        sellingPrice: "",
        region: "",
        desc: "",
        fileList: [],
        zhanshi: true,
        count: 1
      },
      value1: true
    };
  },
  methods: {
    handlePreview(file, fileList) {
      console.log(file, fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    submitUpload() {},
    chaochushi(files, fileList) {
      this.$message.warning(`文件数量超出限制！`);
    },
    change(file, fileList) {
      console.log(file, fileList);
      this.ruleForm.fileList = fileList;
    },
    submitForm(formName) {
      // 创建表单数据
      var form_data = new FormData();
      // 往新表单中添加条目：
      form_data.append("title", this.ruleForm.title);
      form_data.append("author", this.ruleForm.author);
      form_data.append("AuthorPress", this.ruleForm.AuthorPress);
      form_data.append("publicationTime", this.ruleForm.publicationTime);
      form_data.append("serial", this.ruleForm.serial);
      form_data.append("sellingPrice", this.ruleForm.sellingPrice);
      form_data.append("region", this.ruleForm.region);
      form_data.append("desc", this.ruleForm.desc);
      form_data.append("zhanshi", this.ruleForm.zhanshi);
      form_data.append("count", this.ruleForm.count);

      console.log(this.ruleForm.fileList);

      this.ruleForm.fileList.map((v, i) => {
        form_data.append("file" + i, v.raw);
      });

      axios
        .post("/formpost", form_data, {
          serial: this.ruleForm.serial
        })
        .then(res => {
          console.log(res);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    zhanshi(v) {
      console.log(v);
    }
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
.det {
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
}
.el-col-4 {
  width: 9.66667%;
}
.el-button--small,
.el-button--small.is-round {
  padding: 12px 18px;
}
element.style {
  margin-left: 98px;
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
</style>