class Goods {
    //商品列表的容器
    static goodsCon;
    //单个商品的容器
    static picFocus1;
    //记录第一个加载进来的商品id
    static firstId;
    //记录加载后最后一个加载进来的商品id
    static lastId;
    //获取加载的数据
    static data;
    // 拼接每个商品的数据
    // static goodsArr;
    constructor() {
        // Goods.goodsArr=[];
        Goods.firstId = 802;
        Goods.lastId = 821;
        Goods.goodsCon = Public.$('.goods_show_con');
        Goods.picFocus1 = document.getElementsByClassName('picFocus1');
        Goods.getGoods()
        Goods.addEvent()
    }
    //向服务器发送请求，获取商品数据 ，并初始化页面（添加20个商品）
    static getGoods() {
        Public.get('http://localhost/project2/server/server.php?fn=getGoods').then(res => {
            res = JSON.parse(res)["data"]
            Goods.data = res;
            // console.log(Goods.data);
            if (res != 'none') {
                let goodsStr = ''  //拼接字符串
                res.forEach(ele => { //遍历出所有商品信息
                    //    console.log(ele);
                    let {
                        goods_id,
                        goods_name,
                        goods_price,
                        goods_big_logo,
                        goods_small_logo,
                        goods_number
                    } = ele;
                    goodsStr += `<div class="picFocus1">
                <div class="bd">
                    <div class="tempWrap">
                        <ul>
                            <li>
                                <a target="_blank" href="http://localhost//project2/good_detail.html?goods_id=${goods_id}" ><img src="${goods_big_logo}"></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="hd">
                    <ul>
                        <li class="on"><img src="${goods_small_logo}"></li>
                    </ul>
                </div>
                <div class="p_mount">
                    <div class="p_price">
                        <em>￥</em>${goods_price}
                    </div>
                    <div class="p_num">
                        已售<em>${goods_number}</em>件
                    </div>
                </div>
                <div class="p_name">
                    <a href="http://localhost//project2/good_detail.html?goods_id=${goods_id}" title="${goods_name}" target="_blank">
                        ${goods_name}
                    </a>
                </div>
                <div class="in_cart">
                    <span title="网站自营，品质保障">自营</span>
                    <span title="该商品参与满减活动">满减</span>

                </div>
            </div>`
                    //判断是否到了第20个
                    if (goods_id == 821) {
                        //前20个商品添加到页面
                        Goods.goodsCon.innerHTML += goodsStr;
                        //更新两个id
                        Goods.firstId = goods_id - 0 + 1;
                        Goods.lastId = Goods.firstId - 0 + 19;
                    }

                })
            }
        })

    }
    //添加事件
    static addEvent() {
        //给窗口添加滚动事件
        window.onscroll = Goods.loadGoods;
    }
    //根据scrollTop的值，下滑后加载后20个商品
    static loadGoods() {
        Goods.picFocus1 = document.getElementsByClassName('picFocus1');
        // console.log(Goods.firstId, Goods.lastId);
        // 根据scrollTop的值，下滑后加载后20个商品
        //实时获取scrollTop值
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        //获取可视区域的高
        let clientH = document.documentElement.clientHeight;
        //获取最后一行添加的商品的高
        let lastImgH = Goods.picFocus1[Goods.picFocus1.length - 1].offsetTop;
        // console.log(top, clientH, lastImgH);
        let goodsStr = '';
        //判断是否达到加载的条件
        if (parseInt(top + clientH) >= parseInt(lastImgH)) {
            //再次遍历数据 获取后20个
            // console.log(Goods.data);
            //懒加载
            
            Goods.data.forEach(ele => {
                let {
                    goods_id,
                    goods_name,
                    goods_price,
                    goods_big_logo,
                    goods_small_logo,
                    goods_number
                } = ele;
                //开始的商品id大于遍历中的商品id
                if (parseInt(Goods.firstId) <=parseInt(goods_id) && parseInt(Goods.lastId) >=parseInt(goods_id)) {
                    // console.log(Goods.firstId,goods_id,Goods.lastId);
                    goodsStr += `<div class="picFocus1">
                    <div class="bd">
                        <div class="tempWrap">
                            <ul>
                                <li>
                                    <a target="_blank" href="http://localhost//project2/good_detail.html?goods_id=${goods_id}"><img src="${goods_big_logo}"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="hd">
                        <ul>
                            <li class="on"><img src="${goods_small_logo}"></li>
                        </ul>
                    </div>
                    <div class="p_mount">
                        <div class="p_price">
                            <em>￥</em>${goods_price}
                        </div>
                        <div class="p_num">
                            已售<em>${goods_number}</em>件
                        </div>
                    </div>
                    <div class="p_name">
                        <a href="http://localhost//project2/good_detail.html?goods_id=${goods_id}" title="${goods_name}" target="_blank">
                            ${goods_name}
                        </a>
                    </div>
                    <div class="in_cart">
                        <span title="网站自营，品质保障">自营</span>
                        <span title="该商品参与满减活动">满减</span>

                    </div>
                </div>`           
                }
            })
              //添加到页面
            //   console.log(goodsStr);
                Goods.goodsCon.innerHTML += goodsStr;
                //更新两个id
                Goods.firstId = Goods.lastId;
                Goods.lastId = Goods.lastId + 19;
        }

    }
    // static updateDetail(goodsid){
    //     //发送ajax请求，获取goodsid对应的商品数据
    //     Public.get('http://localhost/project2/server/server.php?fn=getOne&goodsid='+goodsid).then(res=>{
    //         res=JSON.parse(res)["data"]
    //         if(res!="none"){
    //             res=res[0]
    //             let {
    //                 goods_id,
    //                 goods_name,
    //                 goods_price,
    //                 goods_big_logo,
    //                 goods_small_logo,
    //                 goods_number
    //             } = res;
    //             console.log(goods_big_logo);
    //         }
    //     })
    // }
}
new Goods()
