$(function(){
    //点击登录按钮，页面出现透明黑背景
    $("#login").click(function(e){
        e.preventDefault();
        var width=window.outerWidth;
        var height=window.outerHeight;
        $(".login_container").removeClass("hidden")
        .css({width,height})    
    });
    //点击选项卡，出现对应的内容
    //$("ul.login-tab").click(function(){console.log(1)})
    $(".login-tab").on("click","li",function(){
        //获取当前触发元素
        var $li=$(this);
        //移出当前active 和 hidden
        $li.parent().find("li.active").removeClass("active");
        $li.parent().next().find("div.show").removeClass("show");
        //获取当前触发元素的目标
        var target=$li.attr("data-target");
        $li.addClass("active");
        //为目标添加show
        $li.parent().next().find(`${target}`).addClass("show");
    });

    //点击×关闭登录框
    $(".login-close").click(function(){
        $(".login_container").addClass("hidden");
    });
    //导航栏的分类项
    var target="";
    $(".nav>ul>li:first").on("click",function () {
        open("/", "_self");
    }).nextAll().on("mouseenter",function () {
        $(".nav>ul>li.active").removeClass("active");
        $("#nav-classify").find(".active").removeClass("active").addClass("hidden");
        $(this).addClass("active");
        target=$(this).attr("data-target");
        $(`${target}`).removeClass("hidden").addClass("active");
    }).on("mouseleave",function (e) {
        var x=e.offsetX;
        var y=e.offsetY;
        //console.log(x,y);
        if(y<0){
             $(".nav>ul>li.active").removeClass("active");
            target=$(this).attr("data-target");
            $(`${target}`).removeClass("active").addClass("hidden");
        }   
    });
    $("#nav-classify").on("mouseleave",function(){
        $(this).find("div.active").removeClass("active").addClass("hidden");
        $(".nav>ul>li.active").removeClass("active");
    })
})


