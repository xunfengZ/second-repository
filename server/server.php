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
//返回商品数据
    function getGoods(){
        $sql="select * from goods";
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
    // 返回单个商品
    function getOne(){
        $goodsid=$_GET['goodsid'];
        $sql="select *from goods where goods_id='$goodsid'";
        $res=query($sql);
        if($res){
            echo json_encode([
                "data"=>$res
            ]);
        }
        else{
            echo json_encode([
                "data"=>"none"
            ]);
        }
    }
    //返回指定的几个商品
    function getSome(){
        $goodsid=$_POST['goodsid'];
        $goodsid=substr($goodsid,0,strlen($goodsid)-1);
        $sql="select *from goods where goods_id in ($goodsid)";
        $data=query($sql);
        if($data){
            echo json_encode([
                "data"=>$data
            ]);
        }else{
            echo json_encode([
                "data"=>"none"
            ]);
        }
    }

?>