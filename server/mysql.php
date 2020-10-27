<?php
function con(){
    //连接
    $link=@mysqli_connect('127.0.0.1','root','root','tmall');
    //判断连接状态
    if($link){
        return $link;
    }else{
        die('连接失败');
    }
}
//非查询操作
function noQuery($sql){
    //先调用连接方法
    $link=con();
    $res=@mysqli_query($link,$sql);
    //返回的是布尔值
    return $res;
}

//查询操作
function query($sql){
    //先调用连接的方法
    $link=con();
    $res=@mysqli_query($link,$sql);
    $arr=[];
    //使用while遍历数据
    while($str=@mysqli_fetch_assoc($res)){
        $arr[]=$str;
    }
    return $arr;
}
?>