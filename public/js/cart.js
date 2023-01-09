/**
 * Cart
 */
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

    var table=document.getElementsByTagName("table")[0];
    
    //查找复选框
    //全选
    var chbAll=table.querySelector("thead [type=checkbox]");
    //已选
    var chbChd=table.querySelector("tfoot [type=checkbox]");
    chbChd.disabled=true;
    //单个复选框
    var chbs=table.querySelectorAll("tbody [type=checkbox]");

    //全选
    chbAll.onclick=function(){
        var chbAll=this;
        for(var chb of chbs){
            chb.checked=chbAll.checked;
        }
        chbChd.checked=chbAll.checked;
        table.querySelector("tfoot tr>td:nth-child(2)>span:nth-child(1)").innerHTML=`已选(${chbs.length})`;

    }



    //单个复选框

    for(var chb of chbs){
        chb.onclick=function(){

            var chb=this;
            if(chb.checked==false){//当前chb未选中
                chbAll.checked=false;
                var checked=document.querySelector("table>tbody [type=checkbox]:checked");
                if(checked!=null){
                    chbChd.checked=true;

                }else{
                    chbChd.checked=false;

                }
            }else{//如果当前chb选中了
                chbChd.checked=true;

                //判断其他chb是否有 "未选中的"
                //如果没有 "未选中的" 则chbAll.checked=true
                var unchecked=document.querySelector("table>tbody [type=checkbox]:not(:checked)");
                if(unchecked==null){
                    chbAll.checked=true;
                    chbChd.checked=true;

                }

            }
            var checkeds=document.querySelectorAll("table>tbody [type=checkbox]:checked");
            if(checkeds!=null){
                //console.log(checkeds.length);
                table.querySelector("tfoot tr>td:nth-child(2)>span:nth-child(1)").innerHTML=`已选(${checkeds.length})`;
            }
        }
    }


    //查找数量加减按钮
    var buttons=table.getElementsByTagName("button");
    //为数量加减绑定事件
    for(var button of buttons){
        button.onclick = function () {
            var btn = this;
            //修改数量
            var count=btn.parentNode.children[1];
            var n=parseInt(count.value);
            if(btn.innerHTML=="+"){
                n++;
            }else{
                n>1?n--:n;
            }
            count.value=n;

            //获取单价
            var price=parseFloat(btn.parentNode.previousElementSibling.children[0].children[0].innerHTML.slice(1));
            //计算小计
            var subTotal=price*n;
            //修改小计
            btn.parentNode.nextElementSibling.innerHTML="￥"+subTotal.toFixed(2);

            //获取原价//计算商品原价的小计
            var originalSubTotal=0;
            var dels=table.querySelectorAll("table del");
            for(var del of dels){
                originalSubTotal+=parseFloat(del.innerHTML.slice(1))*del.parentNode.parentNode.nextElementSibling.children[1].value;
            }
            ///修改商品原价的合计
            table.querySelector(".originaSubTotal").innerHTML="￥"+originalSubTotal.toFixed(2);


            //获取小计//修改应付金额
            var prices=table.querySelectorAll("table span.price");

            var total=0;
            for(var price of prices){
                total+=parseFloat(price.innerHTML.slice(1))*price.parentNode.parentNode.nextElementSibling.children[1].value;
            }
            table.querySelector("tfoot span.pay").innerHTML="￥"+total.toFixed(2);

            //修改活动优惠
            table.querySelector(".yh").innerHTML="￥"+(total-originalSubTotal).toFixed(2);
        }
    }


})()