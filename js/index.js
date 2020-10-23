class Index{
        static timer=''
        //防止点击过快，加1秒延迟
        static delayClick=true;
        //设置一个全局的索引
        static index=0;
        ////根据图片的数量创建
        static imgNum=0;
        static ulobj;
        static liObjs;
        static olobj;
        static olliobjs;

    constructor(){
        //图片的父节点
        Index.ulobj=Public.$('.carouse');
        //图片节点
        Index.liObjs=Index.ulobj.children;
         //dot的父节点
         Index.olobj=Public.$('.uldot');
         //dot节点
         Index.olliobjs=Index.olobj.children;
         //图片数量
        Index.imgNum= Index.liObjs.length;
        Index.setCaroWidth()
        Index.dotList()
        //绑定事件
        Index.onEvent()
        //克隆第一张图片
        Index.clone();
        //自动播放
        Index.autoPlay()
    }
    //获取图片的宽度
    static getImgWidth(){
        //获取单个图片的宽度
        let imgWidth=parseInt(getComputedStyle(Public.$('.slideItem')[0]).width);
        return imgWidth;
    }
    //克隆第一张图
    static clone(){
        //克隆第一张图
        let cloneImg=Index.liObjs[0].cloneNode(true);
        //添加到末尾
        Index.ulobj.appendChild(cloneImg);
        // console.log(cloneImg);
    }
    //设置轮播图总宽
    static setCaroWidth(){
        //获取节点
        //获取单个图片的宽度
        let imgWidth=Index.getImgWidth();
        //轮播图总长度
        let carWidth=parseInt(imgWidth)*(Index.imgNum+1) //+1是给克隆的留出位置
        // console.log(imgNum,carWidth);
        //给carouse设置宽
        Index.ulobj.style.width=carWidth+'px';
    }
    //设置dotList,并添加索引
    static dotList(){
        //获取ul节点
        let uldotObj=Public.$('.uldot');
        //创建原点
        for(let i =0;i<Index.imgNum;i++){
            let liObj=document.createElement('li');
            //默认第一个选中
            if(i==0){
                liObj.className='active';
            }
            //添加索引值
            liObj.index=i;
            //添加到父节点
            uldotObj.appendChild(liObj);
        }
    }
    //添加事件
    static onEvent(){
        //给dot绑定点击事件
        for(let i =0;i<Index.olliobjs.length;i++){
            Index.olliobjs[i].onclick=Index.toggle;
        }
        //给carouse绑定鼠标移入事件
        Index.ulobj.onmouseover=Index.stopAutoMove;
        //给carouse绑定鼠标移出事件
        Index.ulobj.onmouseout=Index.keepAutoMove;

    }

    //点击dot的回调函数，实现dot选中状态
    static check(inde){
        //
        //控制点击频率
        let times='';
        if(!Index.delayClick){
            return;
        }
        Index.delayClick=false;
        times=setTimeout(() => {
            Index.delayClick=true;
        }, 1000);
        // console.log(this);
        //遍历清空所有样式
        for(let i=0;i<Index.imgNum;i++){
            Index.olliobjs[i].className='';
        }
        //给当前点击的dot添加激活类
        Index.olliobjs[inde].className='active';  
       
    }
     //图片轮播
     static imgMove(target,fn){
        $(Index.ulobj).animate({
            left:-target
        },1000,function(){
            fn&&fn()
        })
        
    }
    //点击li的回调函数 实现dot和轮播图的切换
    static toggle(){
        //把当前点击的dom对象赋值给that
        let index=this.index;
        Index.check(index);
        // console.log(index);
        //获取target
        let target=index*Index.getImgWidth();
        Index.imgMove(target)
        // console.log(Index.ulobj,Index.liObjs,$(Index.ulobj));
    }

    //自动播放(类似于实现一直向右点击的功能)
    static autoPlay(){
        Index.timer=setInterval(()=>{
            let target=0;
            // console.log(Index.index,Index.liObjs.length);
            //判断当前index是否到达最大值
            if(Index.index==Index.liObjs.length-2){
               
                //目标距离为多加了一张=克隆图后的距离
                target=(Index.index+1)*Index.getImgWidth();
                //重新设置索引
                Index.index=0;
                Index.imgMove(target,function(){
                    Index.ulobj.style.left='0px'
                })
            }else{
                Index.index++;
                target=Index.index*Index.getImgWidth();
                Index.imgMove(target,function(){
                    // Index.ulobj.style.left='0px'
                    
                })
            }
            console.log(Index.index,target,getComputedStyle(Index.ulobj).left);
            
            Index.check(Index.index)

        },2000)
    }
    //鼠标移入停止（清除定时器）
    static stopAutoMove(){
        clearInterval(Index.timer);
    }
    //鼠标移入自动播放
    static keepAutoMove(){
        Index.autoPlay()
    }
    
}
new Index()