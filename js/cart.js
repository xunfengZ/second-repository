/*****************购物车列表******************* */
class Cart {
    //获取商品内容的父节点
    static orderCon;
    //设置防止点击过快的状态
    static isClick;
    //获取全选节点
    static all;
    //获取单选节点
    static ones;
    //获取已选商品
    static chosen;
    //获取共计
    static total;
    //获取删除选中商品
    static deleteChosen;
    //设置选中的框中的商品id 数组
    static checkArr;
    //获取结算
    static checkout;

    constructor() {
        Cart.checkout=Public.$('.checkout');
        Cart.checkArr=[];
        Cart.deleteChosen=Public.$('.delete-chosen');
        Cart.chosen=Public.$('.piece_num');
        Cart.total=Public.$('.total_text');
        Cart.all=Public.$('#all');
        // Cart.ones=Public.$('.son_check');  //此方法获取不到添加之后的节点
        Cart.ones=document.getElementsByClassName('son_check')
        Cart.isClick=true;
        Cart.orderCon=Public.$('.order_content');
        Cart.addCartList()
        Cart.addEvent()
        Cart.calculate()
    }
    //绑定事件
    static addEvent(){
        //全选
        Cart.all.addEventListener('click',Cart.checkAll)
        //删除选中商品
        Cart.deleteChosen.addEventListener('click',Cart.removeChosen)
        //结算
        Cart.checkout.addEventListener('click',Cart.checkOut)
    }
    //根据localStorage的id 添加商品到购物车列表
    static addCartList() {
        let cartGoods = localStorage.getItem('cart');
        //转为对象
        cartGoods = JSON.parse(cartGoods);
        let goodsId='';
        let goodsStr='';
        //拼接id
        for(var attr in cartGoods){
            goodsId+=attr+',';
        }
        //发送请求
        Public.post('http://localhost/project2/server/server.php?fn=getSome','goodsid='+goodsId).then(res=>{
            res=JSON.parse(res)["data"];
           
            if(res!='none'){
                //遍历商品 添加到页面
                res.forEach(v=>{
                    //解构赋值
                    let {
                        goods_id,
                        goods_name,
                        goods_price,
                        goods_big_logo,
                        goods_small_logo,
                        goods_number
                    } = v;
                    goodsStr+=`<ul class="order_lists">
                    <li class="list_chk">
                        <input type="checkbox" id="checkbox_8" class="son_check" onclick="Cart.checkOne(this,${goods_id})">
                    </li>
                    <li class="list_con">
                        <div class="list_img">
                            <a href="javascript:;"><img src="${goods_small_logo}" alt=""></a>
                        </div>
                        <div class="list_text">
                            <a href="javascript:;">${goods_name}</a>
                        </div>
                    </li>
                    <li class="list_info">
                        <p>规格：默认</p>
                        <p>尺寸：16*16*3(cm)</p>
                    </li>
                    <li class="list_price">
                        <p class="price">￥${goods_price}</p>
                    </li>
                    <li class="list_amount">
                        <div class="amount_box">
                            <a href="javascript:;" class="reduce" onclick="Cart.reduFn(this,${goods_id})">-</a>
                            <input type="text" value="${cartGoods[goods_id]}" class="sum">
                            <a href="javascript:;" class="plus"onclick="Cart.addFn(this,${goods_id})">+</a>
                        </div>
                    </li>
                    <li class="list_sum">
                        <p class="sum_price">￥${(cartGoods[goods_id]*goods_price).toFixed(2)}</p>
                    </li>
                    <li class="list_op">
                        <p class="del">
                            <a href="javascript:;" class="delBtn" onclick="Cart.removeGoods(this,${goods_id})">移除商品</a>
                        </p>
                    </li>
                </ul>`
                })
                //添加到页面
                Cart.orderCon.innerHTML+=goodsStr;
            }
        })
        
    }
    //-----------更新数量
    //-按钮  通过传参的形式获取当前节点
    static reduFn(that,id){
        if(!Cart.isClick){
            return
        }
        Cart.isClick=false;
        setTimeout(function(){
            Cart.isClick=true;
        },500)
        //改变页面上的数值
        let value=that.nextElementSibling.value-0;
        if(value==0){
            that.disabled=true;
            return
        }
        value--;
        that.nextElementSibling.value=value;
        //改变localStorage中的值
        let cart=localStorage.getItem('cart');
        cart=JSON.parse(cart);
        cart[id]--;
        localStorage.setItem('cart',JSON.stringify(cart));
        //更新金额
        Cart.updateMoney(that);
        //更新已选和共计
        Cart.calculate()
    }
    //+按钮
    static addFn(that,id){
        if(!Cart.isClick){
            return
        }
        Cart.isClick=false;
        setTimeout(function(){
            Cart.isClick=true;
        },500)
        //改变页面上的数值
        that.previousElementSibling.value=that.previousElementSibling.value-0+1;
        //改变localStorage中的值
        let cart=localStorage.getItem('cart');
        cart=JSON.parse(cart);
        cart[id]++;
        localStorage.setItem('cart',JSON.stringify(cart))
        //更新金额
        Cart.updateMoney(that);
        //更新已选和共计
        Cart.calculate()
    }
    //---------更新金额
    static updateMoney(that){
        //获取金额节点
        let moneyObj=that.parentNode.parentNode.nextElementSibling.firstElementChild;
       //获取数量节点
        let numObj=that.parentNode.children[1];
       //获取单价节点
        let priceObj=that.parentNode.parentNode.previousElementSibling.firstElementChild;
        //取出单价节点中的数值
        let price=priceObj.innerHTML.split('￥')[1];
        //添加到页面
        moneyObj.innerHTML=(numObj.value*price).toFixed(2);
    }
    //全选操作 让单选跟随全选的状态
    static checkAll(){
        if(Cart.all.checked){ //若全选选中 让所有单选选中
            for(var i=0;i<Cart.ones.length;i++){
                Cart.ones[i].checked=true;
            }
        }else{
            for(var i=0;i<Cart.ones.length;i++){
                Cart.ones[i].checked=false;
            }
        }
        //更新已选和共计
        Cart.calculate()
    }
    //单选操作 若所有单选都选中，让全选也选中；若都不选中，则让全选也不选中
    static checkOne(that,id){
        //统计单选选中的数量 和商品种类的数量做对比
        if(that.checked){
            Cart.checkArr.push(id);
        }else{
            Cart.checkArr.pop(id)
        }
        let checkNum=0;
        for(var i=0;i<Cart.ones.length;i++){
            //选中框的商品id列表
            
            if(Cart.ones[i].checked){
                checkNum++;
            }
        }
    
        let cart=localStorage.getItem('cart');
        cart=JSON.parse(cart);
        //获取商品种类的数量
        let goodsNum=Object.keys(cart).length;
        // console.log(checkNum,goodsNum);
        if(checkNum==goodsNum){   //单选选中的数量=商品种类的数量
            Cart.all.checked=true;
        }else{
            Cart.all.checked=false;
        }
        //更新已选和共计
        Cart.calculate()
    }
    //计算已选商品的数量和共计
    static calculate(){
        //统计选中的商品数量
        let count=0;
        //统计选中的商品总价
        let sum=0;
        for(var i=0;i<Cart.ones.length;i++){
            if(Cart.ones[i].checked){
                //获取当前选中框对应父节点的商品数量
                let numObj=Cart.ones[i].parentNode.parentNode.children[4].firstElementChild.children[1];
                let num=parseInt(numObj.value-0);
                //获取单价节点
                let priceObj=Cart.ones[i].parentNode.parentNode.children[3].firstElementChild;
                let price=(priceObj.innerHTML.split('￥')[1]-0).toFixed(2);
                count+=numObj.value-0;
                sum+=num*price;
            }
        }
        // console.log(count);
        //添加到页面
        Cart.chosen.innerHTML=count;
        Cart.total.innerHTML=sum.toFixed(2);
        //更改颜色
        Cart.changeColor()
    }
    //删除单个商品
    static removeGoods(that,id){
        //页面删除 找到商品的容器删除即可
        let container=that.parentNode.parentNode.parentNode;
        container.remove();
        //localStorage中删除
        let cart=JSON.parse(localStorage.getItem('cart'));
        delete cart[id];
        localStorage.setItem('cart',JSON.stringify(cart))
        Cart.calculate()
    }
    //删除选中商品 需要获取商品id
    static removeChosen(){
        // console.log(Cart.checkArr);
        //删除页面上选中的商品
        for(var i=0;i<Cart.ones.length;i++){
            if(Cart.ones[i].checked){
                Cart.ones[i].parentNode.parentNode.remove();
            }
        }
        //删除localStorage
        let cart=JSON.parse(localStorage.getItem('cart'));
        Cart.checkArr.forEach(id=>{
            delete cart[id];
        })
        localStorage.setItem('cart',JSON.stringify(cart))
        Cart.calculate()
    }
    static changeColor(){
        if(parseInt(Cart.chosen.innerHTML)>0){
            Cart.checkout.style.background='red'
            Cart.checkout.style.cursor='pointer'
        }else{
            Cart.checkout.style.background='#B0B0B0'
            Cart.checkout.style.cursor='not-allowed';
        }
    }
    static checkOut(){

    }
}
new Cart();