<?php
include('./mysql.php');
$fn=$_GET['fn'];
   //获取用户名和密码
    // $name=$_GET['username'];
    // $psw=$_GET['psw'];
$fn();
//验证传入进来的用户名和密码是否存在
function verif(){
    //获取用户名
    $name=$_GET['username'];
    $sql="select * from userinfo where user='$name'"; 
$res=query($sql);
if($res){  //如果存在则返回数据
    echo json_encode([
        'data'=>$res
    ]);
}else{
    echo json_encode([
        'data'=>"none"
    ]);
}
}

//添加数据
function addUser(){
   //获取用户名和密码
    $name=$_GET['name'];
    $psw=$_GET['psw'];
    //拼接sql
    $sql="insert into userinfo values(null,'$name','$psw')";
    // echo $sql;
    $res=noquery($sql);
    if($res){
        echo 1; //成功
    }else{
        echo 2;  //失败
    }
}

?>