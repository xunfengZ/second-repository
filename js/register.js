class Register{
     //设置用户名是否可用的状态
    static accessible=true;
    constructor(){
        Register.addEvent()
    }
    //二级事件绑定
    static addEvent(){
        //验证码框和看不清楚框
        Public.$('.yanzheng').addEventListener('click',Public.getCode)
        Public.$('.change').addEventListener('click',Public.getCode)
        //注册按钮
        Public.$('.btn_register').addEventListener('click',Register.verify)
        //失去焦点检测用户名
        Public.$('#IDnum').addEventListener('blur',Register.detect)
        //失去焦点检测密码
        Public.$('#password1').addEventListener('blur',Register.pswDetect)
        //失去焦点检测确认密码
        Public.$('#password2').addEventListener('blur',Register.confPswDetect)

    }
    //检测用户名是否存在
    static detect(){
        // let accessible=true;
        //获取输入框的用户名
        let name=Public.$('#IDnum').value;
        //若name为空 终止
        if(!name){Public.$('.detection1').innerHTML='不能为空！';return}
        // console.log(name);
        //发送请求
        Public.get('http://localhost/project2/server/server.php?fn=verif&username='+name).then(res=>{
            res=JSON.parse(res)
            // console.log(res);
            let {data}=res;
            // console.log(data);
            if(data!='none'){
                Public.$('.detection1').innerHTML='已被占用！'
                Public.$('.detection1').style.color='red';
               Register.accessible=false;
            //    console.log(accessible);
                // return accessible;
                
            }else{
                Public.$('.detection1').innerHTML='可以使用！'
                Register.accessible=true;
                Public.$('.detection1').style.color='green';
                // console.log(accessible);
                // return accessible;
            }
        }) 
        return Register.accessible
    }
    //检测密码是否符合要求
    static pswDetect(){
        //设置密码是否可用的状态
        let pswAccessible=true;
           //获取输入框的密码
           let psw=Public.$('#password1').value;
           //若密码为空 终止
           if(!psw){Public.$('.detection2').innerHTML='不能为空！';return}
           if(psw.length<6){  //若小于6位则终止
               Public.$('.detection2').innerHTML='不能小于6位';
               pswAccessible=false;
            //    console.log(pswAccessible);
            }else{  //大于6位时 判断密码包含的类型（数字，字母，特殊符号）
                //正则表达式
                let reg1=/[0-9]/; //数字
                let reg2=/[a-zA-Z]/; //字母
                let reg3=/[^a-zA-z\d]/  //非字母和数字
                let count=0;  //三种状态的和
                if(reg1.test(psw)){
                    count++;
                }
                if(reg2.test(psw)){
                    count++;
                }
                if(reg3.test(psw)){
                    count++;
                }
                //判断count的值
                if(count==1){
                    Public.$('.detection2').innerHTML='强度：弱'
                }else if(count==2){
                    // console.log(count);
                    Public.$('.detection2').innerHTML='强度：中'
                    Public.$('.detection2').style.color='yellow';
                }else if(count==3){
                    Public.$('.detection2').innerHTML='强度：强'
                    Public.$('.detection2').style.color='green';
                }
                pswAccessible =true;
                // console.log(pswAccessible);
            }
            return pswAccessible
    }
    //检测确认密码是否和密码相同
    static confPswDetect(){
            //设置确认密码是否可用的状态
         let confPswAccessible=true;
        //获取密码框的值
        let psw=Public.$('#password1').value;
        //获取确认密码框的值
        let psw2=Public.$('#password2').value;
        //判断是否相同
        //先判断是否为空
        if(!psw2){
            Public.$('.detection3').innerHTML='密码不能为空！';
            confPswAccessible=false;
            return confPswAccessible
        }
        if(psw==psw2){
            Public.$('.detection3').innerHTML='密码正确'
            Public.$('.detection3').style.color='green';
            confPswAccessible=true;
        }else{
            Public.$('.detection3').innerHTML='密码不正确'
            Public.$('.detection3').style.color='red';
            confPswAccessible=false;
        }
        // console.log(confPswAccessible);
        return confPswAccessible
    }
    //注册验证
    static verify(){
        //获取用户名 密码 确认密码 验证码的状态
        let accessible=Register.detect();
        let pswAccessible=Register.pswDetect();
        let confPswAccessible=Register.confPswDetect();
        //获取验证码
        let code=Public.$('.yanzhengma').value;
        let codeStatus=Public.codeVerify(code);
        //获取表单中的用户名和密码
        let name=Public.$('#IDnum').value;
        let psw=Public.$('#password1').value;
        // console.log(accessible,pswAccessible,confPswAccessible,codeStatus);
        //当4个状态都为true时，发送请求，添加到数据库
        if(accessible&&pswAccessible&&confPswAccessible&&codeStatus){
            Public.get('http://localhost/project2/server/server.php?fn=addUser&name='+name+'&psw='+psw).then(res=>{
                // res=JSON.parse(res)
                // console.log(res);
                if(res==1){  //数据库添加用户成功
                    alert('注册成功！');
                    //返回登录页面
                    location.href='http://localhost/project2/login.html';
                }else{
                    alert('注册失败！');
                }
            })
        }else{
            alert('注册失败！')
        }
    }
}
new Register()