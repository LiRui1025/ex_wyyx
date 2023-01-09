// (function(){
    //邮箱验证
    var emailpass=false;
    var email=document.getElementById("email");
    var emailMsg=document.getElementById("emailMsg");
    function emailCheck(){
        if(email.value==''){
            emailMsg.innerHTML="邮箱不能为空";
            emailMsg.style.color="#ca5252";
    		return;
    	}
        var reg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        var bool=reg.test(email.value);
        if(!bool){
            emailMsg.innerHTML="邮箱格式不正确";
            emailMsg.style.color="#ca5252";
            return;
        }
    	var xhr=new XMLHttpRequest();
    	xhr.onreadystatechange=function(){
    		if(xhr.readyState==4 && xhr.status==200){
                var result=JSON.parse(xhr.responseText);
                //console.log(result);
    			if(result.code==1){
                    emailMsg.innerHTML="该邮箱已被注册";
                    emailMsg.style.color="#ca5252";
                    return;
    			}else{
                    emailMsg.innerHTML="该邮箱可注册";
                    emailpass=true;
    			}
    		}
        }
    	xhr.open("get","/user/emailCheck/"+email.value,true);
    	xhr.send();
    }
    //密码验证
    var upwdpass=false;
    var upwd=document.getElementById("upwd");
    var upwdMsg=document.getElementById("upwdMsg");
    function upwdCheck(){
        if(upwd.value==''){
            upwdMsg.innerHTML="密码不能为空";
            upwdMsg.style.color="#ca5252";
    		return;
    	}
        var reg=/^(\w){6,20}$/;
        var bool=reg.test(upwd.value);
        if(!bool){
            upwdMsg.innerHTML="密码格式不正确";
            upwdMsg.style.color="#ca5252";
            upwd.value="";
            return;
        }else{
            upwdMsg.innerHTML="密码符合格式要求";
            upwdpass=true;
        }
    }
    //再次输入密码的检查
    var upwdAgainpass=false;
    var upwdAgain=document.getElementById("upwdAgain");
    var upwdAgainMsg=document.getElementById("upwdAgainMsg");
    function checkUpwdAgain(){
    	if(upwd.value==upwdAgain.value){
            upwdAgainMsg.innerHTML="密码输入正确";
            upwdAgainpass=true;
    	}else{
            upwdAgainMsg.innerHTML="两次密码输入的不一致";
            upwdAgainMsg.style.color="#ca5252";
            return;
    	}
    }
    //手机号码的验证
    var phonepass=false;
    var phone=document.getElementById("phone");
    var phoneMsg=document.getElementById("phoneMsg");
    function checkPhone(){  
        if(phone.value==''){
            phoneMsg.innerHTML="手机号码不能为空";
            phoneMsg.style.color="#ca5252";
    		return;
    	}
        var reg=/^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$/;
        var bool=reg.test(phone.value);
        if(!bool){
            phoneMsg.innerHTML="手机号码格式不正确";
            phoneMsg.style.color="#ca5252";
            phone.value="";
            return;
        }  
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result=JSON.parse(xhr.responseText);
                if (result.code == 1) {
                    phoneMsg.innerHTML = "该号码已注册";
                    phoneMsg.style.color="#ca5252";
                    return;
                } else {
                    phoneMsg.innerHTML = "该号码可注册";
                    phonepass = true;
                }
            }
        }
        xhr.open("get", "/user/phoneCheck/" + phone.value, true);
        xhr.send();
    }

    //注册
    function register() {
        var chb = document.querySelector("input[type=checkbox]");
        var bool=emailpass && upwdpass && upwdAgainpass && phonepass && chb.checked;     
        if (!bool) {
            alert("您还未填写完整");
            return;     
        } 
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result=JSON.parse(xhr.responseText);
                console.log(result);
                if(result.code == 1){
                    alert(result.msg);
                    location.replace("/");
                }else{
                    alert(result.msg);
                    history.go(0);
                }
            }
        }
        var url = "/user/register";
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var formdata = "email=" + email.value + "&upwd=" + upwd.value + "&phone=" + phone.value;
        xhr.send(formdata);
    } 
// })()