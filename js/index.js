/*********************轮播图封装类 (命名失误)********************/
class Index{
    /***********轮播图相关全局变量***************/
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
                })
            }
            // console.log(Index.index,target,getComputedStyle(Index.ulobj).left);
            
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
/****************购物头条跑马灯*************************/
class Marquee{
    //爷爷容器节点
    static ranklist;
    //父容器节点
    static ulobj;
    //子节点
    static liobjs;
    //节点数量
    static liNum;
    //索引
    static index;
    //定时器
    static timer;
    constructor(){
        //初始化
        Marquee.ranklist=Public.$('.ranklist')
        Marquee.ulobj=Marquee.ranklist.children[0];
        Marquee.liobjs=Marquee.ulobj.children;
        Marquee.liNum=Marquee.liobjs.length;
        Marquee.index=0;
        Marquee.timer='';
        Marquee.autoMove()
        Marquee.setIndex()
        Marquee.cloneLi()
        Marquee.addEvent()
    }
    //绑定事件
    static addEvent(){
        //鼠标移入停止运动
        Marquee.ranklist.addEventListener('mouseover',Marquee.pauseMove)
        //鼠标移出开始运动
        Marquee.ranklist.addEventListener('mouseout',Marquee.keepMove)
    }
    //获取单个节点的高度
    static getHeight(){
        let liWidth=parseInt(getComputedStyle(Marquee.liobjs[0]).height);
        return liWidth;
    }
    //设置所有li的index
    static setIndex(){
        for(let i=0;i<Marquee.liNum;i++){
            Marquee.liobjs[i].index=i;
        }
    }
    //克隆所有li
    static cloneLi(){
        for(var i=0;i<Marquee.liNum;i++){
            var cloneli=(Marquee.liobjs[i].cloneNode(true));
            //添加到ul末尾
            Marquee.ulobj.appendChild(cloneli);
        }
    }
    //加载时自动执行自动运动方法
    static autoMove(){
        //设置框的滚动条高度为0
        // Marquee.ranklist.scrollTop=0
        Marquee.timer=setInterval(()=>{
            
            /*判断当前框的滚动条高度是否大于原始ul的高度，大于之后就重置当前框的滚动条（因为
            上面有了克隆的方法，直接获取Marquee.ulobj.scroolHeight会把克隆的也算进去，所以不能直接用）
            */
           if(Marquee.ranklist.scrollTop>=Marquee.liNum*Marquee.getHeight()){
            Marquee.ranklist.scrollTop=0;
            }else{
                Marquee.ranklist.scrollTop++;
            }

        },20)
            // console.log(Marquee.ranklist.scrollTop,Marquee.liNum*Marquee.getHeight());
    }
    //鼠标移入暂停
    static pauseMove(){
        clearInterval(Marquee.timer);
    }
    //鼠标移出继续
    static keepMove(){
        Marquee.autoMove()
    }
}
new Marquee()
/*******************限时秒*************** */
class Seckill{
    static timer;
    //场次开始时间
    static roundHour;
    //获取节点
    //场次
    static roundHourObj
    //剩余时
    static remainHourObj;
    //剩余分
    static remainMObj;
      //剩余秒
      static remainSObj;
    constructor(){
        Seckill.timer='';
        //初始化获取节点
        Seckill.roundHourObj=Public.$('.countdown-desc').children[0];
        Seckill.remainHourObj=Public.$('.hours');
        Seckill.remainMObj=Public.$('.minutes');
        Seckill.remainSObj=Public.$('.seconds');
        Seckill.setRoundTime()
        Seckill.setRemainTime()
        Seckill.autoMove();
        // console.log(Seckill.roundHour,Seckill.remainHour,Seckill.remainM,Seckill.remainS);
    }
    //设置当前秒杀场次的时间整点 例：2:00 4:00 12:00
    static setRoundTime(){
        let date=new Date();
        let hour=date.getHours()
        //判断当前时间的奇偶状态,确定场次开始时间
        if(hour%2==0){ //为偶数时，当前hour就是场次开始时间
            Seckill.roundHour=hour
        }else{ //为奇数时，当前hour-1就是场次开始时间
            Seckill.roundHour=hour-1
        }
        // console.log(Seckill.roundHour);
        //显示到页面
        Seckill.roundHourObj.innerHTML=-0+ Seckill.roundHour+':00';
    }
    //设置剩余的时间到页面
    static setRemainTime(){
        let nextdate=new Date();
        let hour=nextdate.getHours()
        //设置场次结束的时间
        // console.log(hour);
        if(hour%2==0){
            //当前时间是偶数，那么本场结束时间为2小时后
            nextdate.setHours(hour+2)
            nextdate.setMinutes(0);
            nextdate.setSeconds(0);
            // console.log();
        }else{
            //当前时间是奇数，那么本场结束时间为1小时后
            nextdate.setHours(hour+1)
            nextdate.setMinutes(0);
            nextdate.setSeconds(0);
        }
        //转换为时间戳
        //结束时间的时间戳
        let nextTimestamp=nextdate.getTime();
        //当前时间的时间戳
        let nowTimestamp=new Date().getTime();
        //差值为
        let diff=(nextTimestamp-nowTimestamp)/1000;
        // console.log(diff);
        //声明计算后的时分秒。
        let h=0,m=0,s=0;
        
        if(diff>60){ //差值大于60s
            m=parseInt(diff/60);
            s=parseInt(diff%60);
            if(m>60){
                h=parseInt(m/60);
                m=parseInt(m%60);
            }
        }else{
            s='0'+diff;
        }
        //优化得到的数据，前面加上0
        if(s<10){
            s='0'+s;
        }  
        if(m<10){
            m='0'+m
        }
        if(h<2){
            h='0'+h
        }
        //添加到页面
        Seckill.remainHourObj.innerHTML=h;
        Seckill.remainMObj.innerHTML=m;
        Seckill.remainSObj.innerHTML=s;
    }
    //自动倒计时
    static autoMove(){
        Seckill.timer=setInterval(() => {
            Seckill.setRemainTime()
        }, 1000);
    }
}
new Seckill()
/*********************吸顶**********************/
class Ceiling{
    static header;
    static headerCont;
    constructor(){
        Ceiling.header=Public.$('.header');
        Ceiling.headerCont=Public.$('.header_container');
        Ceiling.setCeiling()
    }
    static setCeiling(){
        window.onscroll=Ceiling.getScroll;
    }
    static getScroll(){
        //获取scrollTop值
        let top=document.documentElement.scrollTop||document.body.scrollTop;
        //判断是否到达一定的位置
        // console.log(top,getComputedStyle(Ceiling.header).top);
        if(top>300){
            Ceiling.header.style.top=0+'px';
            Ceiling.header.classList.add('top-ceiling');
        }else{
            Ceiling.header.classList.remove('top-ceiling')
        }
    }
}
new Ceiling()
