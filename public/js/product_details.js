(function(){
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
    //从地址栏获取商品的编号
    var lid=location.search.split("=")[1];
    //console.log(lid);
    $.ajax({
        url:"http://127.0.0.1:3000/product/details",
        type:"get",
        data:{lid},
        dataType:"json",
        success:function(result){
           // console.log(result); 
            var {product,specs,pics}=result;
            //将获取的数据动态放入HTML中
            //查找title
            $(".pro_title").html(product.title)
            .next().html(product.subtitle)
            .next().next().find(".price").html(`￥${product.price}`)
            .next().html(`￥${product.delprice}`)
            .parent().parent().find(".pro_promise>div>a").html(product.promise);
            //将规格列表放入相对应的位置
            var html="";
            for(var spec of specs){
                html+=`<li><img src="${spec.spec_img}" title="${spec.spec_title}"/></li>`
            }
            $(".pro_spec ul").html(html);
            //商品详情放入相对应的位置
            $(".details>div.details_img").html(`${product.details}`);

            //将商品的大中小图片放到相应的位置
            var html="";
            for(var p of pics){
                html+=`<li><img src="${p.sm}" data-md="${p.md}" data-lg="${p.lg}" alt="" /></li>`;
            }
            var $sul=$(".imgsm_show ul");
            $sul.html(html);
            //第一张图片放到中图所显示的位置
            var $mImg=$(".imgmd_show img")
            .attr({src:pics[0].md});
            var $divLg=$("div.imglg_show")
            .css({
                backgroundImage:`url(${pics[0].lg})`
            });
            // 放大镜效果
            //1.鼠标移入小图片img,切换中图片和大图片
            //利用冒泡将事件绑定在ul上，只允许img元素触发事件
            $sul.on("mouseenter","li>img",function(){
                var $img=$(this);
                var src=$img.attr("data-md");
                $mImg.attr({src});
                var backgroundImage=`url(${$img.attr("data-lg")})`;
                $divLg.css({backgroundImage});
            })
            //2.鼠标进入中图片，显示遮罩层和大图片
            //鼠标移出中图片，隐藏遮罩层和大图片
                  var $mask=$(".mask");
                  var $smask=$(".supermask");
                  
                  var max=330;//superMask430-mask100
                /*
                  $smask
                  .mouseenter(function(){
                    $mask.removeClass("hidden");
                    $divLg.removeClass("hidden");
                  })
                  .mouseleave(function(){
                    $mask.addClass("hidden");
                    $divLg.addClass("hidden");
                  })
                */
               $smask.hover(function(){
                     $mask.toggleClass("hidden");
                    $divLg.toggleClass("hidden");
                })
                //3.mask跟随鼠标移动，并同步移动大div的背景图片的位置
                .mousemove(function(e){
                    var left=e.offsetX-50;
                    var top=e.offsetY-50;
                    if(left<0) left=0
                    else if(left>max) left=max;
                    if(top<0) top=0
                    else if(top>max) top=max;
                    $mask.css({left,top});
                    var backgroundPosition=`${-1*left}px ${-1*top}px`;
                    $divLg.css({backgroundPosition});
                })
                
        }
    });
})()