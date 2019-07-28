<template>
  <!-- v-show="isResed" -->
  <div class="detail" v-show="isResed">
    <Head></Head>
    <p @click="goBack" class="back">回到列表</p>
    <div class="title">[{{obj.name}}]&nbsp;&nbsp;{{obj.title}}</div>
    <div class="date">更新时间：{{obj.updatetime}}</div>
    <div class="content">
      <mavon-editor
        v-model="content"
        :subfield="false"
        :defaultOpen="defaultData"
        :toolbarsFlag="false"
        :boxShadow="false"
      />
    </div>

    <!-- 评论 -->
    <div class="comment-box">
      <div class="comment-list" v-for="item in commentList" :key="item.id">
        <p class="reply-f">
          <span class="reply-time-name-box">
            <span class="reply-name-box">{{item.comment_name}}</span>&nbsp;&nbsp;
            <span class="reply-time-box">{{item.create_time}}</span>
          </span>
          <span class="reply-comment-text" @click="goReply(item)">回复</span>
        </p>
        <p>{{item.content}}</p>

        <!-- 回复评论列表 -->
        <div v-if="item.subList.length>0" class="sub-list-box">
          <div class="sub-list" v-for="item1 in item.subList" :key="item1.id">
            <p class="reply-f">
              <span class="reply-time-name-box">
                <span class="reply-name-box">{{item1.comment_name}}</span>
                &nbsp;回复&nbsp;{{item1.reply_user_name}}
                <span
                  class="reply-time-box"
                >&nbsp;&nbsp;{{item1.create_time}}</span>
              </span>
              <span class="reply-comment-text" @click="goReply(item1,item)">回复</span>
            </p>
            <p>{{item1.content}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-add">
      <textarea ref="textArea" :placeholder="textPlaceholder" v-model="commentContent" rows="4" maxlength="100"></textarea>
        <p class="count-text">{{textLength}}/100</p>
    </div>
    <div class="btn-list">
      <div class="confirm-btn" @click="addComment">提交</div>
      <div class="back-btn" @click="goBack">返回</div>
    </div>
  </div>
</template>
<style scoped>
.title {
  line-height: 50px;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
}
.detail {
  background: #fff;
  min-height: 100vh;
}
.date {
  display: flex;
  justify-content: flex-end;
  padding: 0 60px;
  line-height: 30px;
  color: darkgray;
  font-size: 14px;
}
.content {
  margin-top: 20px;
  padding: 0 60px;
}
.back {
  line-height: 20px;
  padding: 10px;
}
textarea {
  width: 100%;
  /* position: relative; */
}
.comment-add {
  display: flex;
  justify-content: center;
  padding: 0 60px;
  position: relative;
}
.btn-list {
  display: flex;
  justify-content: space-around;
  margin: 10px 0 20px;
  text-align: center;
}
.confirm-btn {
  width: 80px;
  line-height: 40px;
  background-color: cadetblue;
  color: #fff;
  border-radius: 4px;
}
.back-btn {
  width: 80px;
  line-height: 40px;
  background-color: #fff;
  color: #000;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
}
.comment-box {
  padding: 10px 60px;
}
.comment-list {
  padding: 10px 0;
  border-top: 1px solid #e1e1e1;
}
.reply-f {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.reply-comment-text {
  color: cornflowerblue;
}
.reply-time-box {
  color: darkgray;
}
.sub-list {
  margin-left: 20px;
  margin-top: 10px;
  border-top: 1px solid #e1e1e1;
  padding-top: 10px;
}
.count-text{
    position: absolute;
    bottom: 15px;
    right: 40px;
}
</style>
<style scoped>
@media screen and (max-width: 980px) {
  .date {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
    line-height: 30px;
    color: darkgray;
    font-size: 14px;
  }
  .content {
    margin-top: 20px;
    padding: 0 20px;
  }
  .title {
    padding: 10px 15px 0;
    line-height: 30px;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
  }
  .comment-add {
    padding: 10px 30px;
    position: relative;
  }
  textarea {
    width: 100%;
    /* position: relative; */
  }
  .comment-box {
    padding: 10px 20px;
  }
  .sub-list {
    margin-left: 10px;
    margin-top: 10px;
    border-top: 1px solid #e1e1e1;
    padding-top: 10px;
  }
}
</style>
<script>
import { getDetail, getCommentList, addComment } from "../service/service.js";
import { dateFormate } from "../util.js";
import { Toast  } from "mint-ui";
import Head from "./head";
const commentName = `少侠${Math.floor(Math.random() * 100)}`;
let dateend = 0;
export default {
  components: {
    Head
  },
  data() {
    return {
      content: "",
      obj: {},
      defaultData: "preview",
      isResed: false,
      replyId: "",
      commentContent: "",
      commentList: [],
      textPlaceholder: "留下一点足迹~",
      replyUserName: ""
    };
  },
  computed:{
      textLength(){
          return this.commentContent.length
      }
  },
  methods: {
    getDetail() {
      getDetail(
        {
          id: this.$route.query.id
        },
        res => {
          this.isResed = true;
          this.obj = res.data.data;
          this.content = this.obj.content;
          this.obj.updatetime = dateFormate(Number(this.obj.updatetime));
        }
      );
    },
    addComment() {
       
        let datenow = new Date().getTime();
        

        if(datenow-dateend<20*1000){
            return Toast('少侠的发言太快了，稍后再进行提交~')
        }
        
        if(!this.commentContent.trim()){
            return Toast('评论内容不能为空~');
        }
      let param = {
        comment_name: commentName,
        reply_id: this.replyId || -1,
        content: this.commentContent,
        article_id: this.$route.query.id,
        reply_user_name: this.replyUserName
      };
      addComment(param, res => {
        console.log(res);
         dateend = new Date().getTime()
        this.commentContent = "";
        this.getCommentList();
      });
    },
    getCommentList() {
      getCommentList(
        {
          article_id: this.$route.query.id
        },
        res => {
           
          const allList = res.data.list || []; //返回数据全量的副本
          for (let i in allList) {
            allList[i].create_time = dateFormate(
              Number(allList[i].create_time)
            ).slice(0, 10);
            allList[i].subList = [];
            for (let j = Number(i) + 1; j < allList.length; j++) {
        
              if (allList[i].id == allList[j].reply_id) {
                allList[i].subList.push(allList[j]);
              }
            }
          }
          const newArr = [];
          for (let i = 0, j = allList.length; i < j; i++) {
            if (allList[i].reply_id < 0) {
              newArr.push(allList[i]);
            }
          }
          this.commentList = newArr;

         
        }
      );
    },

    goReply(obj, parentObj) {
      this.replyUserName = obj.comment_name;
      this.textPlaceholder = `回复${obj.comment_name}:`;
      this.replyId = parentObj ? parentObj.id : obj.id || "";
      window.scrollTo(0, document.body.scrollHeight);
      this.$refs.textArea.focus()
    },
    goBack() {
      window.history.go(-1)
    },
    changeData(value, render) {
      console.log(render);
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    
  },
  activated() {
    console.log("activated");
    this.isResed = false;
    this.replyId = "";
    this.commentContent = "";
   
    this.commentList= []
    this.textPlaceholder= "留下一点足迹~"
    this.replyUserName=""

    this.getDetail();
    this.getCommentList();
  },
  deactivated() {
    console.log("deactivated");
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    // to.meta.keepAlive = true
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave");
    next();
  }
};
</script>
