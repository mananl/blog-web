<template>
  <div class="box">
    <div>
      <span>文章标题：</span>
      <el-input style="width:400px;" v-model="title" placeholder="请输入文章标题"></el-input>
    </div>
    <div>
      <span>分类：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <div>
      <span>内容：</span>
    </div>
    <div class="markdown-box">
      <!-- <mavonEditor ref='ed' @imgAdd="$imgAdd" v-model="content"></mavonEditor> -->
      <!-- mavonEditor -->
      <mavon-editor ref="md" @imgAdd="$imgAdd" v-model="content"></mavon-editor>
    </div>

    <div class="add-btn" @click="addBlog">新增</div>
  </div>
</template>
<style scoped>
.box {
  /* padding: 10px; */
}
.markdown-box {
  color: #222;
}
.box .add-btn {
  border: 1px solid #e1e1e1;
  justify-content: center;
  margin: auto;
  line-height: 30px;
  background-color: darkturquoise;
  color: #fff;
  width: 100px;
  border-radius: 3px;
}
.box div {
  margin-bottom: 10px;
  display: flex;
}

span {
  line-height: 40px;
  display: inline-block;
  width: 100px;
  text-align: right;
}
</style>

<script>
import { addNews, typelist } from "../service/service.js";
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      price: "",
      author: "",
      content: "",
      options: [],
      value: ""
    };
  },
  // components:{
  //   mavonEditor
  // },
  methods: {
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // console.log(this.$refs.md)
      // debugger
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      axios({
        url:'http://39.97.162.134:8001/blog/upload',
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        // debugger
        let url = res.data.url
        
        let url1 = '/images/' + url.split('/')[url.split('/').length-1];
        this.$refs.md.$img2Url(pos, url1);
      });
    },

    //获取分类列表
    getTypeList() {
      typelist(res => {
        console.log(res);
        this.options = res.data.list || [];
      });
    },

    addBlog() {
      let params = {
        title: this.title,
        typeid: this.value,
        content: this.content
        // author: this.author
      };
      let _this = this;
      addNews(
        params,
        res => {
          console.log(res);
          if (res.data.code === 0) {
            // this.bookName = "";
            // this.price = "";
            // this.description = "";
            // this.author = "";

            this.$message(res.data.msg);
            
          } else {
           this.$message(res.data.msg);
          }
          history.go(-1)
        },
        err => {
          console.log(err);
        }
      );
    },
    goHome() {
      this.$router.push({
        name: "index"
      });
    }
  },
  mounted() {
    this.getTypeList();
  }
};
</script>

