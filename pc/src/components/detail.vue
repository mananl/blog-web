<template>
    <div  class="detail">
        
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
</style>

<script>
import { getDetail } from "../service/service.js";
import { dateFormate } from "../util.js";
export default {
    data(){
        return{
            content:'',
            obj:{},
            defaultData: "preview"
        }
    },
    methods:{
        getDetail(){
            getDetail({
                id:this.$route.query.id
            },res => {
                this.obj = res.data.data 
                this.content = this.obj.content
                this.obj.updatetime = dateFormate(Number(this.obj.updatetime))
            })
        },
        changeData(value, render) {
            console.log(render);
        }
    },
    mounted(){
        this.getDetail()
    }
}
</script>
