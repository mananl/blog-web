<template>
  <div class="index-box">
    <!-- 头部 -->
    <div class="header-box">
      <img src="../assets/pic.jpg" alt='头像'>
      <p class="intro">公路_陷阱</p>
    </div>
    <!-- 导航切换 -->
    <ul class="nav-box">
      <!-- <li >JS小结</li>
      <li>CSS小结</li>
      <li>Vue小结</li>
      <li>webpack小结</li>-->
      <li
        v-for="(item,index) in typeList"
        :key="index"
        @click="getListByName(item.id)"
        :class="[selectedId==item.id?'select-li':'','']"
      >{{item.name}}</li>
    </ul>

    <div class="wrap-box">
      <div class="list-box">
        <ul v-show="listData.length>0" class="arti-ul">
          <li
            v-for="item in listData"
            :key="item.id"
            @click="goDetail(item.id,item.typeid,item.content)"
          >
            <p class="art-title">{{item.title}}</p>
            <p class="s-row">
              <span style="color:#b71ed7">{{item.name}}</span>
              <span>{{item.updatetime}}</span>
            </p>
          </li>
        </ul>
        <p class="no-data" v-show="isResponsed&&listData.length==0">暂无数据</p>
      </div>

      <div class="right-box">
        <ul class="pro-list">
          <li>相关链接</li>
          <li v-for="(item,index) in linkList" :key="item.id">
            <a :href="item.content" target="_blank">{{index+1}}.&nbsp;&nbsp;{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
ul {
  list-style: none;
}
.intro {
    color: snow;
    font-size: 14px;
}
.no-data {
  color: #909090;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
}
.index-box {
  /* width: 1000px;
  margin: 0 auto; */
  background: #f4f4f5;
  min-height: 100vh;
}
.header-box {
  display: flex;
  justify-content: flex-start;
  padding: 10px 20px;
  align-items: center;
  background: #272424;
  color: #fff;
}
.header-box img {
  width: 25px;
  height: 25px;
  border-radius: 25px;
  margin-right: 20px;
}
.wrap-box {
  width: 1000px;
  min-height: 50px;
  margin: 20px auto 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.nav-box {
  width: 100%;
  min-height: 40px;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  box-shadow: 0 2px 5px rgba(241, 241, 241, 0.8);
  box-sizing: border-box;
}
.nav-box li {
  line-height: 40px;
  color: #909090;
  /* width: auto; */
  min-width: 100px;
  text-align: center;
  font-size: 14px;
  /* text-indent: 20px; */
  cursor: pointer;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  width: 100%;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
}
.list-box {
  background: #fff;

  padding: 5px 15px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  flex: 1;
}
.list-box .arti-ul {
  overflow: hidden;
}
.list-box li {
  float: left;
  line-height: 20px;
  font-size: 12px;
  color: #000;
  width: 100%;
  border-bottom: 1px solid #efecec;
  padding: 10px 0;
}
.right-box {
  margin-left: 20px;
  flex-basis: 240px;
  height: 300px;
  background: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 15px;
}
.s-row {
  display: flex;
  justify-content: space-between;
}
.nav-box .select-li {
  color: cornflowerblue;
}
.pro-list li {
  line-height: 40px;
}
</style>
<style scoped>
@media screen and (max-width: 980px) {
  .wrap-box {
    width: 100%;
    /* padding: 0 20px; */
    margin-top: 10px;
  }
  .right-box {
    display: none;
  }
  .nav-box {
    overflow: scroll;
    justify-content: flex-start;
  }
}
ul,
menu,
dir {
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0;
}
</style>
<style>
a {
  text-decoration: none;
  color: #0895f9;
}
</style>


<script>
import { dateFormate } from "../util.js";
import { getBlogList, typelist, linkList } from "../service/service.js";
import { Indicator } from "mint-ui";
import "mint-ui/lib/style.css";
let ROUTE = {};
export default {
  data() {
    return {
      listData: [],
      pageSize: 15,
      pageNum: 1,
      isCanPost: true,
      typeList: [],
      selectedId: "",
      isResponsed: false,
      linkList: []
    };
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    ROUTE = from;
    next();
  },
  methods: {
    //跳转详情页
    goDetail(id, tid, url) {
      if (tid == 4) {
        window.location.href = url;
      } else {
        this.$router.push({
          name: "detail",
          query: {
            id: id
          }
        });
      }
    },

    //获取分类列表
    getTypeList() {
      typelist(
        res => {
          console.log(res);
          this.typeList = res.data.list || [];

          this.typeList.unshift({
            id: "",
            name: "全部"
          });
        },
        err => {
          console.log(err);
        }
      );
    },

    getLinkList() {
      linkList(
        res => {
          console.log(res);
          this.linkList = res.data.list || [];
        },
        err => {
          console.log(err);
        }
      );
    },

    getListByName(id) {
      this.selectedId = id;
      this.listData = [];
      this.pageNum = 1;
      this.getList();
    },

    //获取数据列表
    getList() {
      if (this.pageNum > Math.ceil(this.total / this.pageSize)) {
        return false;
      }
      Indicator.open();

      this.isResponsed = false;
      getBlogList(
        {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          typeid: this.selectedId
        },
        res => {
          this.pageNum++;
          this.isCanPost = true;
          let list = res.data.list || [];
          list.forEach(c => {
            c.updatetime = dateFormate(Number(c.updatetime));
          });
          if (this.listData.length > 0) {
            if (
              this.listData[this.listData.length - 1].id !==
              list[list.length - 1].id
            ) {
              this.listData = this.listData.concat(list);
            }
          } else {
            this.listData = this.listData.concat(list);
          }

          this.total = res.data.total || 0;
          this.isResponsed = true;
          Indicator.close();
        },
        function(err) {
          console.log(err);
          Indicator.close();
        }
      );
    },
    //取窗口可视范围的高度
    getClientHeight() {
      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight =
          document.body.clientHeight < document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      } else {
        clientHeight =
          document.body.clientHeight > document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      }
      return clientHeight;
    },
    handleScroll() {
      let allHeight = $("#app")[0].offsetHeight;
      let tpScrollTop =
        document.body.scrollTop + document.documentElement.scrollTop;

      let clientH = this.getClientHeight();
      if (allHeight - tpScrollTop - clientH <= 20 && this.isCanPost) {
        this.isCanPost = false;

        this.getList();
      }
    }
  },
  activated() {
    if (!ROUTE.name) {
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.listData = [];
    this.pageNum = 1;
    this.isCanPost = true;
    this.getList();
    this.getTypeList();
    this.getLinkList();
  }
};
</script>


