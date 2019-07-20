<template>
    <div class="page">
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </div>
</template>
<style scoped>
    .page{
        width: 100%;
        height: 40px;
        position: relative;
    }
    ul{
        overflow: hidden;
        position: absolute;
        right: 10px;
    }
    li{
        float: left;
        width: 30px;
        line-height: 40px;
        cursor: pointer;
    }
</style>
<script>
export default {
    name:'Page',
    data(){
        return {

        }
    }
}
</script>
