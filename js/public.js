class Public {
    constructor() {
        Public.verifyCode();
        Public.getColor();
        // Public.getCode();
        //    Public.addEvent();
        // Public.oneEvent()
    }
    //选择器的封装
    static $(ele) {
        let lis = document.querySelectorAll(ele);
        if (lis.length > 1) {
            return lis;
        } else {
            return lis[0];
        }
    }
    //get请求
    static get(url) {
        return new Promise((resovle, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('get', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //接收返回的值
                    resovle(xhr.response);
                }
            }
            xhr.send();
        })
    }
    //post请求
    static post(url, data) {
        return new Promise((resovle, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('post', url);
            //设置请求头
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //接受返回的值
                    resovle(xhr.response);
                }
            }
            xhr.send(data);
        })
    }

    //验证码随机4位字符
    static verifyCode() {
        let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        let str = '';
        for (var i = 0; i < 4; i++) {
            let index = Math.floor(Math.random() * arr.length);
            str += arr[index];

        }
        return str;
    }
    //随机颜色
    static getColor() {
        let str = '#';
        for (var i = 0; i < 6; i++) {
            str += Math.round(Math.random() * 15).toString(16);

        }
        return str;

    }
    //更新验证码(回调函数)
    static getCode(){
        Public.$('.yanzheng').innerHTML = Public.verifyCode();
        // console.log(Public.$('.yanzheng').innerHTML);
        Public.$('.yanzheng').style.color = Public.getColor();
        Public.$('.yanzheng').style.background = Public.getColor()
    }

    //验证码的验证
    static codeVerify(code) {
        // console.log(code.toLowerCase());
        // console.log(Public.$('.yanzheng').innerHTML.toLowerCase());
        if (code.toLowerCase() == Public.$('.yanzheng').innerHTML.toLowerCase()) {
            return true;
        } else {
            return false;
        }
    }
        // //绑定DOM一级事件 阻止默认事件
        // static oneEvent(){
        //     Public.$('.yanzheng').addEventListener('click',Public.fn)
        // }
        // static fn(event){
        //     var e=event||window.event;
        //     console.log(e);
        //     e.preventDefault();
        //     return false;
        //     console.log(1);
        //     // e.stopPropagation()
        //     // console.log(event);
        // }
}
new Public();