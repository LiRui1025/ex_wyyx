$(function(){
    //加载页头header页面和页尾footer页面
    //第一种方式，iframe，跳转其他页面难达到，自适应也不太好，再者对搜索引擎极不友好
    //第二种方式，通过jQuery load事件加载页面，比较简单，但会刷新页面，可以return flase 阻止页面刷新
    // $(document).ready(function(){
    //     var $hc=$("#header-container");
    //     $hc.load("header.html");
    // })
    //第三种方式：通过js中的ajax进行异步刷新，但是有一个问题，被加载过来的界面中的js不能使用，只能把HTML界面加载过来，但是js加载不过来，但是可以动态创建script标签在需要的地方把js加载过来即可
    //第四种方式：$.ajax()异步刷新,既不刷新页面，JS功能也能正常加载实现
    $(document).ready(function(){
        //封装一个ajax加载页面的函数，包含两个参数，url和加载内容的容器
        function ajaxload(url,$c){
            htmlobj=$.ajax({url:url,async:false});
            $c.html(htmlobj.responseText);
            return false
        }
        
        var $fc=$("#footer-container");
        ajaxload("footer.html",$fc);
        var $hc=$("#header-container");
        ajaxload("header.html",$hc);

    })



    //轮播图
    //点击指示符事件
    $(".carousel-indicators").on("click","li",function(){
        var $li=$(this);
        //切换指示符的样式
        $(".carousel-indicators .active").removeClass("active");
        $li.addClass("active")
        //切换图片
        var i=Number($li.attr("data-slide-to"));
        //获取轮播图的容器，确定是哪一个
        var parent=$li.attr("data-target");
        var $img=$(`${parent}`).find(`.carousel-inner .carousel-item:eq(${i})`);
        $(".carousel-inner img.active").removeClass("active");
        $img.addClass("active");
    })
    //点击箭头，切换图片
    function arrow(direction,container){
        //console.log(typeof(direction));
        //获取轮播图的容器，确定是哪一个
        var $c=$(`${container}`);
        var $li=$c.find("ul>li.active");
        // direction//朝右+1   朝左-1  
        //获取当前活动的指示符及对应编号[0~6] 图片
        var i= Number($li.attr("data-slide-to"));
        var count=$c.find(".carousel-inner .carousel-item").length;
        var $img=$c.find(`.carousel-inner .carousel-item:eq(${i})`);
        $img.removeClass("active");
        $li.removeClass("active");
        i=i+direction*1;
        if(direction==-1){if(i<0){i=count-1;}}
        if(direction==1){if(i>count-1){i=0;}}

        $c.find(`.carousel-inner .carousel-item:eq(${i})`).addClass("active");
        $c.find(`.carousel-indicators li:eq(${i})`).addClass("active");   
    }

    $(".carousel-control-prev").click(function(e){
        e.preventDefault();
        var a=$(this);
        var container=a.attr("href");
        arrow(-1,container);
    });
    $(".carousel-control-next").click(function(e){
        e.preventDefault();
        var a=$(this);
        var container=a.attr("href");
        arrow(1,container);
    });

    //自动执行切换图片，模拟点击
    var timer=setInterval(()=>{
        $(".carousel").find(".carousel-control-next").click();
    },3000);
    //当鼠标进入轮播图则清除自动播放
    $(".carousel").hover(
         function(){
            clearInterval(timer);
        },
        function(){
            var timer=setInterval(()=>{
                //$(".carousel-control-next").trigger("click");
                $(".carousel").find(".carousel-control-next").click();
            },3000);
        }
    )

})