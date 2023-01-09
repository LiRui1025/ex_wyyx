SET NAMES UTF8;
DROP DATABASE IF EXISTS wyyx;
CREATE DATABASE wyyx CHARSET=UTF8;
USE wyyx;
#用户信息表
CREATE TABLE wyyx_user(
  uid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,   #用户的ID，为用户的唯一表示，由系统自动生成
  uname VARCHAR(32),  
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone  VARCHAR(16) NOT NULL UNIQUE,  #手机号码
  avatar VARCHAR(128),  #头像图片路径
  user_name VARCHAR(32),  #用户名，如王小明
  gender INT  #性别  0—>女  1->男
);


#用户地址表
CREATE TABLE wyyx_receiver_address(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,  #用户编号
  receiver VARCHAR(16),  #接收人姓名
  province VARCHAR(16),  #省
  city VARCHAR(16),  #市
  county VARCHAR(16),  #县
  address VARCHAR(128),  #详细地址
  cellphone VARCHAR(16),  #手机
  fixedphone VARCHAR(16),  #固定电话
  postcode CHAR(6),  #邮编
  tag VARCHAR(16),  #标签名
  is_default BOOL, #是否为当前用户的默认收货地址
  FOREIGN KEY (user_id) REFERENCES wyyx_user(uid)
);




#用户订单表
CREATE TABLE wyyx_order(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,  #用户编号
  address_id INT,
  atatus INT,  #订单状态 1-等待付款 2-等待发货 3-运输中 4-已签收 5-已取消
  order_time BIGINT, #下单时间
  pay_time BIGINT,  #付款时间
  deliver_time BIGINT, #发货时间
  received_time BIGINT,  #签收时间
  FOREIGN KEY (user_id) REFERENCES wyyx_user(uid),
  FOREIGN KEY (address_id) REFERENCES wyyx_receiver_address(aid)
);





#商品分类表
CREATE TABLE wyyx_product_family(
  fid INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(32),  #一级类别名称
  second_name VARCHAR(32),  #二级类别名称
  third_name VARCHAR(32)  #三级类别名称
);

INSERT INTO wyyx_product_family VALUES(NULL,"居家生活","智造馆","智能家居");
INSERT INTO wyyx_product_family VALUES(NULL,"居家生活","夏凉系列","");
INSERT INTO wyyx_product_family VALUES(NULL,"居家生活","","");
INSERT INTO wyyx_product_family VALUES(NULL,"居家生活","","");
INSERT INTO wyyx_product_family VALUES(NULL,"居家生活","","");
INSERT INTO wyyx_product_family VALUES(NULL,"居家生活","","");

#商品详情表
CREATE TABLE wyyx_product(
  lid INT PRIMARY KEY AUTO_INCREMENT, #产品标号
  name VARCHAR(32),  #商品名称
  family_id INT,  #所属型号家族编号
  title VARCHAR(32),  #主标题
  subtitle VARCHAR(32),  #副标题
  price DECIMAL(7,2),  #价格
  delprice DECIMAL(7,2),  #原价
  promise VARCHAR(64),  #服务承诺
  details VARCHAR(1024),  #产品详细说明
  shelf_time BIGINT,  #上架时间
  sold_count INT,  #已售出的数量
  is_onsale BOOL,  #是否促销中
  FOREIGN KEY (family_id) REFERENCES wyyx_product_family(fid)
);

INSERT INTO wyyx_product VALUES(10001,"网易智能蒸汽沐足盆",1,"网易智能蒸汽沐足盆","火遍全网蒸脚神器 让双脚每天享受15分钟桑拿",369,449,"･ 支持30天无忧退换货 ･ 48小时快速退款 ･ 满88元免邮费 ･ 网易自营品牌 ･ 国内部分地区无法配送","网易智能蒸汽沐足盆details","2018-01-02",2800,TRUE);

#商品详情图表
CREATE TABLE wyyx_product_pic(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT,  #商品编号
  sm VARCHAR(128),  #小图片路径
  md VARCHAR(128), #中图片路径
  lg VARCHAR(128),  #大图片路径
  FOREIGN KEY (product_id) REFERENCES wyyx_product(lid)
);

INSERT INTO wyyx_product_pic VALUES(NULL,10001,"images/details/product_10001/10001_sm_1.jpg","images/details/product_10001/10001_md_1.jpg","images/details/product_10001/10001_lg_1.jpg");
INSERT INTO wyyx_product_pic VALUES(NULL,10001,"images/details/product_10001/10001_sm_2.jpg","images/details/product_10001/10001_md_2.jpg","images/details/product_10001/10001_lg_2.jpg");
INSERT INTO wyyx_product_pic VALUES(NULL,10001,"images/details/product_10001/10001_sm_3.jpg","images/details/product_10001/10001_md_3.jpg","images/details/product_10001/10001_lg_3.jpg");
INSERT INTO wyyx_product_pic VALUES(NULL,10001,"images/details/product_10001/10001_sm_4.jpg","images/details/product_10001/10001_md_4.jpg","images/details/product_10001/10001_lg_4.jpg");
INSERT INTO wyyx_product_pic VALUES(NULL,10001,"images/details/product_10001/10001_sm_5.jpg","images/details/product_10001/10001_md_5.jpg","images/details/product_10001/10001_lg_5.jpg");



#商品详情规格表
CREATE TABLE wyyx_product_spec(
  sid INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT,  #产品标号
  spec_title VARCHAR(64),  #规格/颜色
  spec_img VARCHAR(64),  #规格小图
  FOREIGN KEY (product_id) REFERENCES wyyx_product(lid)
);
INSERT INTO wyyx_product_spec VALUES(NUll,10001,"白色","10001_spec_1.jpg");
INSERT INTO wyyx_product_spec VALUES(NUll,10001,"粉色","10001_spec_2.jpg");

#用户购物车表
CREATE TABLE wyyx_shopping_cart(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,  #用户编号
  product_id INT,  #商品编号
  count INT,  #购买数量
  product_img VARCHAR(128),  #图片路径
  FOREIGN KEY (user_id) REFERENCES wyyx_user(uid),
  FOREIGN KEY (product_id) REFERENCES wyyx_product(lid)
);

#用户订单详情表
CREATE TABLE wyyx_order_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,  #订单编号
  product_id INT,  #产品编号
  count INT, #购买数量
  FOREIGN KEY(order_id) REFERENCES wyyx_order(aid),
  FOREIGN KEY(product_id) REFERENCES wyyx_product(lid)
);

#首页轮播图表
CREATE TABLE wyyx_index_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  class VARCHAR(128),  #图片分组：大图、居家...
  img VARCHAR(128),  #图片路径
  title VARCHAR(64),  #图片描述
  href VARCHAR(128)  #图片链接
);

#首页商品栏目表
CREATE TABLE wyyx_index_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(64),    #商品标题
  details VARCHAR(128),   #详细描述
  pic VARCHAR(128),    #图片
  price DECIMAL(10,2),   #商品价格
  href VARCHAR(128),
  seq_recommended TINYINT,
  seq_new_arrival TINYINT,
  seq_top_sale TINYINT 
);

/*******************/
/******数据导入******/
/*******************/

/**用户信息**/
INSERT INTO wyyx_user VALUES
(NULL, 'dingding', '123456', 'ding@qq.com', '13501234567', 'images/avatar/default.png', '丁伟', '1'),
(NULL, 'dangdang', '123456', 'dang@qq.com', '13501234568', 'images/avatar/default.png', '林当', '1'),
(NULL, 'doudou', '123456', 'dou@qq.com', '13501234569', 'images/avatar/default.png', '窦志强', '1'),
(NULL, 'yaya', '123456', 'ya@qq.com', '13501234560', 'images/avatar/default.png', '秦小雅', '0');

