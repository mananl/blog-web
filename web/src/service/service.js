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