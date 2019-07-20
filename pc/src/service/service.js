import instance from './options'
// let base = 'http://localhost:3000/'
export function getNewsList (params,callback,errfun){
    instance.get(instance.baseURL+'/blog/list',{params}).then(res => callback(res)).catch(err=>errfun(err))
}

export function addNews (params,callback,errfun){
    instance.post(instance.baseURL+'/blog/add',params).then(res => callback(res)).catch(err=>errfun(err))
}

export function updateBlog (params,callback,errfun){
    instance.post(instance.baseURL+'/blog/update',params).then(res => callback(res)).catch(err=>errfun(err))
}

export function getDetail (params,callback,errfun){
    instance.get(instance.baseURL+'/blog/getDetail',{params}).then(res => callback(res)).catch(err=>errfun(err))
}


export function typelist (callback,errfun){
    instance.get(instance.baseURL+'/blog/typelist').then(res => callback(res)).catch(err=>errfun(err))
}

