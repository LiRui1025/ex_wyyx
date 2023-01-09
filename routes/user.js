//引入模块
const express=require("express");
const pool=require("../pool.js");
//创建一个空的路由器
const router=express.Router();
//添加路由
//uname检查
router.get('/unameCheck/:uname',(req,res)=>{
	var $uname=req.params.uname;
	pool.query('SELECT * FROM wyyx_user WHERE uname=?',[$uname],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			//此用户名存在
			res.send("0");
		}else{
			//此用户名不存在
			res.send("1");
		}
	});
}); 
//uid检查
router.get('/uidCheck/:uid',(req,res)=>{
	var $uid=req.params.uid;
	pool.query('SELECT * FROM wyyx_user WHERE uid=?',[$uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("此编号存在");
		}else{
			res.send("此编号不存在");
		}
	});
});
//email检查
router.get('/emailCheck/:email',(req,res)=>{
	var $email=req.params.email;
	pool.query('SELECT * FROM wyyx_user WHERE email=?',[$email],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:1,msg:'该邮箱已被注册'});
		}else{
			res.send({code:-1,msg:'该邮箱可注册'});
		}
	});
});
//phone检查
router.get('/phoneCheck/:phone',(req,res)=>{
	var $phone=req.params.phone;
	pool.query('SELECT * FROM wyyx_user WHERE phone=?',[$phone],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			//此号码已注册
			res.send({code:1,msg:'此号码已注册'});
		}else{
			//此号码可注册
			res.send({code:-1,msg:'此号码可注册'});
		}
	});
});
//注册
router.post('/register',(req,res)=>{
	var $email=req.body.email;
	var $upwd=req.body.upwd;
	var $phone=req.body.phone;
	pool.query('insert into wyyx_user values(null,null,?,?,?,null,null,null)',[$upwd,$email,$phone],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:1,msg:'注册成功'});
		}else{
			res.send({code:-1,msg:'err'});
		}
	});
});
//登录
router.post('/login',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	pool.query('SELECT * FROM wyyx_user WHERE uname=? AND upwd=?',[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("登录成功");
		}else{
			res.send("登录失败");
		}
	
	});
});
//用户列表
router.post('/list',(req,res)=>{
	pool.query('select * from wyyx_user',(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});


//添加信息
router.post('/info',(req,res)=>{
	var $email=req.body.email;
	var $phone=req.body.phone;
	var $avatar=req.body.avatar;
	var $user_name=req.body.user_name;
	var $gender=req.body.gender;
	pool.query('update wyyx_user set email=?,phone=?,avatar=?,user_name=?,gender=? where uid=?',[$email,$phone,$avatar,$user_name,$gender,$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('添加信息成功');
		}else{
			res.send('err');
		}
	});
});
module.exports=router;