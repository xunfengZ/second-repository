class Login{

    constructor(){
        Login.addEvent();
        Public.getCode();
    }

    //绑定二级事件
    static addEvent(){
        //验证码框和看不清楚框
        Public.$('.yanzheng').addEventListener('click',Public.getCode)
        Public.$('.change').addEventListener('click',Public.getCode)
        Public.$('.btn_register').addEventListener('click',Login.verify)
    }

    //点击登录时，先判断用户名和密码是否正确，再判断验证码是否正确
    //回调函数
    static verify(){
        //获取用户名
        let name=Public.$('#IDnum').value;
        //获取密码
        let psw=Public.$('#password').value;
        //获取验证码
        let code=Public.$('.yanzhengma').value;
        //验证码的状态 true/false
        let codeStatus=Public.codeVerify(code);
        //若没有输入用户名
        if(!name){alert('请输入用户名'); return}
        //若输入了用户名没有输入密码
        if(name&&!psw){alert('请输入密码');return}
        //若输入了用户名和密码，没有输入验证码
        if(name&&psw&&!code){alert('请输入验证码');return}
        // console.log(codeStatus);
        //若都输入了 开始验证
        //发送ajax请求
        Public.get('http://localhost/project2/server/server.php?fn=verif&username='+name).then(res=>{
            res=JSON.parse(res);
            //  console.log(res);
            //解构赋值
            let{data}=res;
            console.log(data);
            if(data!='none'){  //若返回的数据不是空,表示用户名存在
            //真实的用户名
            let true_name=data[0]['user'];
            //真实的密码
            let true_psw=data[0]['password'];
            //用户名是否正确的状态
            let nameStatus=(name==true_name);
            //密码是否正确的状态
            let pswStatus=(psw==true_psw);
            console.log(nameStatus,pswStatus);
            //判断用户名和密码和验证码是否正确
            if(!nameStatus||!pswStatus){
                alert('用户名或密码错误!');
                //刷新验证码
                Public.getCode();
            }
            if(nameStatus&&pswStatus&&!codeStatus){
                alert('验证码错误！');
                  //刷新验证码
                  Public.getCode();
            }
                //用户名密码验证码都正确
            if(nameStatus&&pswStatus&&codeStatus){ //登录成功
                location.href='http://localhost/project2/index.html'
            }
            }else{
                    alert('用户名不存在！请注册');
                    location.href='http://localhost//project2/register.html';
                      //刷新验证码
                      Public.getCode();
            }
            
        })
        
    }
}
new Login();