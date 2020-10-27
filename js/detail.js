/*******************商品细节 *************/
class Detail {
    //声明全局索引 方便大图切换时使用
    static index;
    //获取小图片节点
    static smallObjs;
    //获取商品展示区域的节点
    static showZone;
    //获取商品展示区域的图片
    static showImg;
    //获取黄块节点
    static yellowBlock;
    //获取放大区域节点
    static zoom;
    //获取放大区域中图的图片
    static zoomImg;
    //获取父节点容器
    static container;
    //获取标题节点
    static payTitle;
    //获取价格
    static price;
    //获取累计销量
    static saleNum;
    //获取切换面板
    static tabMainUlLi;
    //获取切换的内容
    static tabCon;
    //=========初始化传进来的商品数据
    static goods_id;
    static goods_name;
    static goods_price;
    static goods_big_logo;
    static goods_small_logo;
    static goods_number;
    constructor() {
        Detail.tabCon = Public.$('.tab-con')[0].children;
        Detail.tabMainUlLi = Public.$('.tab-ul').children;
        Detail.saleNum = Public.$('.si_cumulative')[1];
        Detail.price = Public.$('.shop_price');
        Detail.payTitle = Public.$('.pay_title');
        Detail.getGoodsId()
        Detail.zoomImg = Public.$('.zoombox')
        Detail.yellowBlock = Public.$('.mask');
        Detail.zoom = Public.$('.big');
        Detail.showZone = Public.$('#showbox');
        // console.log(Detail.showZone.offsetLeft);
        Detail.container = Public.$('.new-container');
        // console.log(Detail.container.offsetLeft);
        Detail.showImg = Public.$('.showimg');
        Detail.index = 0;
        Detail.smallObjs = Public.$('#showsum').children[0].children
        Detail.addEvent()
        // Detail.bigExchange(Detail.index+1)
        // Detail.zoomExchange(Detail.index+1)
    }
    //添加事件
    static addEvent() {
        //给小图片添加事件
        for (let i = 0; i < Detail.smallObjs.length; i++) {
            //设置索引
            Detail.smallObjs[i].index = i;
            Detail.smallObjs[i].addEventListener('mouseover', Detail.smallExchange)
        }
        //给图片展示区绑定鼠标移入事件
        Detail.showZone.addEventListener('mouseover', Detail.show)
        //给图片展示区绑定鼠标移出事件
        Detail.showZone.addEventListener('mouseout', Detail.hide)
        //给图片展示区绑定鼠标移动事件
        Detail.showZone.addEventListener('mousemove', Detail.move)
        //给tab-ul添加点击事件
        for (var i = 0; i < Detail.tabMainUlLi.length; i++) {
            Detail.tabMainUlLi[i].index = i;
            Detail.tabMainUlLi[i].addEventListener('click', Detail.tabToggle);
        }
    }
    //实现小图切换
    static smallExchange() {
        //存储当前索引
        Detail.index = this.index;
        //遍历循环清除所有样式
        for (var i = 0; i < Detail.smallObjs.length; i++) {
            Detail.smallObjs[i].classList.remove('sel')
        }
        // 给当前节点添加类
        this.classList.add('sel');
        // //同时实现大图切换
        // Detail.bigExchange(Detail.index+1)
        // Detail.zoomExchange(Detail.index+1)
    }
    // //实现大图切换
    // static bigExchange(index){
    //     Detail.showImg.src= Detail.goods_big_logo;
    // }
    // //放大图区域图片切换
    // static zoomExchange(index){
    //     Detail.zoomImg.src= Detail.goods_big_logo
    // }
    //移入事件触发时，显示
    static show() {
        //先显示黄块和zoom区
        Detail.yellowBlock.style.display = 'block';
        Detail.zoom.style.display = 'block';
    }
    //移开事件触发时，隐藏
    static hide() {
        Detail.yellowBlock.style.display = 'none';
        Detail.zoom.style.display = 'none';
    }
    //鼠标移动 控黄块移动
    static move(event) {
        let e = window.event || event;
        //获取鼠标在container中的相对位置坐标
        let mouseX = e.pageX - Detail.container.offsetLeft;
        let mouseY = e.pageY - Detail.container.offsetTop;
        // console.log(mouseX,mouseY);
        //黄块根随 让鼠标在黄块中间显示
        //获取黄块的坐标
        let maskX = mouseX - (Detail.yellowBlock.offsetWidth) / 2;
        let maskY = mouseY - (Detail.yellowBlock.offsetHeight) / 2;
        // console.log(maskX,maskY);
        //限制在showzone内
        if (maskX <= 0) maskX = 0;
        if (maskY <= 0) maskY = 0;
        //计算黄块最大移动距离
        let maxX = Detail.showZone.offsetWidth - Detail.yellowBlock.offsetWidth;
        let maxY = Detail.showZone.offsetHeight - Detail.yellowBlock.offsetHeight;
        if (maskX >= maxX) maskX = maxX
        if (maskY >= maxY) maskY = maxY
        Detail.yellowBlock.style.left = maskX + 'px';
        Detail.yellowBlock.style.top = maskY + 'px';
        //让放大区域的图跟随移动
        //mask移动的距离/mask移动最大距离=大图移动的距离/大图移动的最大距离
        //计算比例和大图移动的最大距离
        let bigImgMaxX = Detail.zoomImg.offsetWidth - Detail.zoom.offsetWidth;
        let bigImgMaxY = Detail.zoomImg.offsetHeight - Detail.zoom.offsetHeight;
        //计算大图的坐标
        let bigImgX = maskX / maxX * bigImgMaxX;
        let bigImgY = maskY / maxY * bigImgMaxY;
        // console.log(maskX/maxX,maskY/maxY);
        // console.log(bigImgX,bigImgY);
        //赋值给大图的坐标
        Detail.zoomImg.style.left = -bigImgX + 'px';
        Detail.zoomImg.style.top = -bigImgY + 'px';
    }
    //获取goodsid，并设置数据
    static getGoodsId() {
        let data = location.search;
        //获取商品id
        let id = data.split('=')[1];
        //发送ajax请求，获取goodsid对应的商品数据
        Public.get('http://localhost/project2/server/server.php?fn=getOne&goodsid=' + id).then(res => {
            res = JSON.parse(res)["data"]
            if (res != "none") {
                res = res[0]
                // console.log(res);
                for (let attr in res) {
                    Detail.goods_id = res["goods_id"];
                    Detail.goods_name = res["goods_name"];
                    Detail.goods_price = res["goods_price"];
                    Detail.goods_big_logo = res["goods_big_logo"];
                    Detail.goods_small_logo = res["goods_small_logo"];
                    Detail.goods_number = res["goods_number"];
                }
                // console.log(res);
                //设置展示区的图
                Detail.showImg.src = Detail.goods_big_logo;
                //设置列表小图
                let smallimg = Detail.smallObjs[0].children[0];
                smallimg.src = Detail.goods_big_logo;
                //设置放大区域的图
                Detail.zoomImg.src = Detail.goods_big_logo;
                //设置标题
                Detail.payTitle.innerHTML = Detail.goods_name;
                //设置价格
                Detail.price.innerHTML = Detail.goods_price;
                //设置销量
                Detail.saleNum.children[0].innerHTML += Detail.goods_number;
            }
        })
    }

    //实现标签切换

    static tabToggle() {
        //------标签切换
        //遍历取消所有样式
        for (var i = 0; i < Detail.tabMainUlLi.length; i++) {
            Detail.tabMainUlLi[i].className = '';
        }
        this.className = 'current';
        //-------内容切换
        let index = this.index; //获取当前标签索引
        //遍历取消其他内容样式
        for (var i = 0; i < Detail.tabCon.length; i++) {
            Detail.tabCon[i].style.display = 'none';
        }
        Detail.tabCon[index].style.display = 'block';
    }
}
new Detail()
/***************添加购物车*************/
class addCart {
    //获取数量
    static buyNum;
    //获取+号
    static addBtn;
    //获取-号
    static reduBtn;
    //获取立即购买按钮
    static buyBtn;
    //获取加入购车按钮
    static addCartBtn;
    //加入后的提示信息
    static alertObj;
    constructor() {
        addCart.alertObj=Public.$('.cart-alert');
        addCart.buyBtn = Public.$('.btn_buynow');
        addCart.addCartBtn = Public.$('.btn_append');
        addCart.buyNum = Public.$('.buy_num');
        addCart.addBtn = Public.$('.btn_add');
        addCart.reduBtn = Public.$('.btn_reduce');
        addCart.addEvent()
    }
    //添加事件
    static addEvent() {
        addCart.addBtn.addEventListener('click', addCart.addFn);
        addCart.reduBtn.addEventListener('click', addCart.reduFn);
        addCart.buyBtn.addEventListener('click', addCart.buyFn);
        addCart.addCartBtn.addEventListener('click', addCart.addCartFn);
    }
    //获取当前商品id
    static getGoodsId() {
        let data = location.search;
        //获取商品id
        let id = data.split('=')[1];
        //发送ajax请求，获取goodsid对应的商品数据
       
        return id;
    }
    //点击+的回调函数
    static addFn() {
        addCart.buyNum.value = addCart.buyNum.value - 0 + 1

    }
    //点击-的回调函数
    static reduFn() {
        if (addCart.buyNum.value == 0) {
            addCart.reduBtn.style.disabled = true;
            return
        }
        addCart.buyNum.value = addCart.buyNum.value - 0 - 1
    }
    //加入购物车的回调函数 (更新localStorage)
    static addCartFn() {
        // let timer='';
        //获取商品id
        let id=addCart.getGoodsId();
        //获取商品数量
        let num=addCart.buyNum.value-0;
        console.log(id,num);
        //创建localStorage
        let cart=localStorage.getItem('cart');
        if(!cart){  //不存在就创建
            let goods={[id]:num}
            localStorage.setItem('cart',JSON.stringify(goods))

        }else{  //存在就添加数量
            cart=JSON.parse(cart);  //先转为对象  {885:3,887:2}
            for(let attr in cart){     
                if(attr==id){
                    num+=cart[id]   //更新数量
                }
            }
            cart[id]=num;
            localStorage.setItem('cart',JSON.stringify(cart))
        }
        //提示加入成功
        addCart.alertObj.innerHTML='加入成功！';
        setTimeout(() => {
            addCart.alertObj.style.display='none';
        }, 1000);
        addCart.alertObj.style.display='block';
    }
       //立即购买的回调函数
       static buyFn() {
        //跳转到购物车页面
        location.href='./cart.html'
    }


}
new addCart()