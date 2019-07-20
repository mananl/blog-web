<template>
    <div>
        <Step :currentVal='currentVal' :errorStep='errorStep'></Step>
        <div class="form"> currentVal:<input v-model.number="currentVal" type="tel" maxlength="2" ></div>
        <div class="form">  errorStep&nbsp;:<input v-model.number="errorStep" type="tel" maxlength="2"></div>
       
       
    </div>
</template>
<style scoped>
.form{
    padding: 10px;
}
</style>

<script>
import Step from './steps'
export default {
    components:{
        Step
    },
    data(){
        return{
            currentVal:1,
            errorStep:0,
        }
    }
}
</script>
