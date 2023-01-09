//引入模块
const express=require("express");
const pool=require("../pool.js");
//创建一个空的路由器
const router=express.Router();
//添加路由
router.get("/details",(req,res)=>{
     var lid=req.query.lid;
      //res.send(lid);
      var output={
            product:{},
            specs:[],
            pics:[]
      };
      var sql="select * from wyyx_product where lid=?";
      pool.query(sql,[lid],(err,result)=>{
            if(err) throw err;
            output.product=result[0];
            var sql="select * from wyyx_product_spec where product_id=?"
            pool.query(sql,[lid],(err,result)=>{
                  if(err) throw err;
                  output.specs=result;
                  var sql="select * from wyyx_product_pic where product_id=?"
                  pool.query(sql,[lid],(err,result)=>{
                         if(err) throw err;
                        output.pics=result;
                        //console.log(output);
                        res.send(output);
                   })
            })
      })
})
module.exports=router;