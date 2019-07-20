import { getBookList } from "../../service/service.js";
//数据state
const state = {
    dataList:[], 
    cartList:[]
};

//getters  抛出数据
const getters = {
    dataList:state => state.dataList,

    cartList:state => state.cartList,

    totalNum:state => {
        let num = 0
        state.cartList.forEach(c => {
            num = num + c.num
        });
        return num
    },

    totalCount:state => {
        let count = 0
        state.cartList.forEach(c => {
            count = count + c.num*c.price
        });
        return count
    }
};

//Mutation 改变数据的钩子
const mutations = {
    //获取商品列表
    setData (state,list){
        state.dataList = list.list
    },
    //向购物车增加商品
    addGoods(state,id){
        let book = state.dataList.find(c=>c.id === id)
        let tag = state.cartList.findIndex(c=>c.id === id)
        if(tag!==-1){
            state.cartList[tag].num++
        }else{
            state.cartList.push({
                id:book.id,
                name:book.book_name,
                price:book.price,
                num:1
            })
        }    
    },
    //减少购物车商品
    deleteGoods(state,id){
        let index = state.cartList.findIndex(c=>c.id === id)
        if(state.cartList[index].num===1){
            state.cartList.splice(index,1)
        }else{
            state.cartList[index].num--
        }
    },
    //清空购物车
    clearCart(state){
        state.cartList = []
    }
}

//actions,异步请求数据提交mutation 改变state
const actions = {
    getList({commit}){
        getBookList(res =>{
            commit('setData',{list:res.data.list})
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}