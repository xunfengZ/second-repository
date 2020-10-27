let axios={
    //get方法
    get(url){
        return new Promise((resovle,reject)=>{
            let xhr=new XMLHttpRequest();
            xhr.open('get',url);
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4&&xhr.status==200){
                    //接收返回的值
                    resovle(xhr.response);
                }
            }
            xhr.send();
        })
    },
    //post方法
    post(url,data){
        return new Promise((resovle,reject)=>{
            let xhr=new XMLHttpRequest();
            xhr.open('post',url);
            //设置请求头
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4&&xhr.status==200){
                    //接受返回的值
                    resovle(xhr.response);
                }
            }
            xhr.send(data);
        })
    }
}