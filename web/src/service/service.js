import instance from './options'
// let base = 'http://localhost:3000/'
export function getBlogList (params,callback,errfun){
    instance.get(instance.baseURL+'/blog/list',{params}).then(res => callback(res)).catch(err=>errfun(err))
}

export function getDetail (params,callback,errfun){
    instance.get(instance.baseURL+'/blog/getDetail',{params}).then(res => callback(res)).catch(err=>errfun(err))
}


export function typelist (callback,errfun){
    instance.get(instance.baseURL+'/blog/typelist').then(res => callback(res)).catch(err=>errfun(err))
}

export function linkList (callback,errfun){
    instance.get(instance.baseURL+'/blog/linkList').then(res => callback(res)).catch(err=>errfun(err))
}

//获取评论列表
export function getCommentList (params,callback){
    instance.get(instance.baseURL+'/comment/list',{params}).then(res => callback(res))
}

//添加评论
export function addComment (params,callback){
    instance.post(instance.baseURL+'/comment/add',params).then(res => callback(res))
}