<template>
 <!-- v-show="isResed" -->
    <div  class="detail" v-show="isResed">
    
        <p @click="goBack" class="back">回到列表</p>
        <div class="title">[{{obj.name}}]&nbsp;&nbsp;{{obj.title}}</div>
        <div class="date">更新时间：{{obj.updatetime}}</div>
        <div class="content">
        <mavon-editor v-model="content"  :subfield="false" :defaultOpen="defaultData" :toolbarsFlag="false" :boxShadow="false"/>
        </div>
    </div>
</template>
<style scoped>
  
    .title{
        line-height: 50px;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
    }
    .detail{
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
    .content{
        margin-top: 20px;
        padding: 0 60px;
    }
    .back{
        line-height: 20px;
        padding: 10px;
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
    .content{
        margin-top: 20px;
        padding: 0 20px;
    }
    .title{
        padding: 10px 15px 0;
        line-height: 30px;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
    }
}
</style>
<script>
import { getDetail } from "../service/service.js";
import { dateFormate } from "../util.js";
export default {
    data(){
        return{
            content:'',
            obj:{},
            defaultData: "preview",
            isResed:false,
        }
    },
    methods:{
        getDetail(){
            
            getDetail({
                id:this.$route.query.id
            },res => {
                this.isResed = true
                this.obj = res.data.data 
                this.content = this.obj.content
                this.obj.updatetime = dateFormate(Number(this.obj.updatetime))
            })
        },
        goBack(){
            this.$router.push({
                name:'step'
            })
        },
        changeData(value, render) {
            console.log(render);
        }
    },
    beforeCreate(){
        console.log('beforeCreate')
    },
    activated(){
        console.log('activated')
         this.isResed = false
        this.getDetail()
    },
    deactivated(){
        console.log('deactivated')
    },
    beforeRouteEnter(to,from,next){
        console.log('beforeRouteEnter')
        // to.meta.keepAlive = true
        next()
    },
    beforeRouteLeave(to,from,next){
        
        // if(to.name=='index'){
        //     from.meta.keepAlive = false
        // }else{
        //     from.meta.keepAlive = true
        // }
        
        console.log('beforeRouteLeave')
        next()
    }
}
</script>
