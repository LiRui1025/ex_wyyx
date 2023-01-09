//引入模块及第三方中间件
const express=require("express");
const bodyParser=require("body-parser");
const userRouter=require("./routes/user.js");
const productRouter=require("./routes/product.js");
//创建服务器
const server=express();
//监听
server.listen(3000,()=>{
	console.log("服务器已启动...");
});
//静态托管
server.use(express.static("public"));
//第三方中间件body-parser设置
server.use(bodyParser.urlencoded({
	extended:false
}));
//路由挂载
server.use("/user",userRouter);
server.use("/product",productRouter);
