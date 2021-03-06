/**入口**/
//加载express模块
var express=require('express');


//加载模版处理模版
var swig=require('swig');


//创建app应用
var app=express();


//加载数据库
var mongoose=require('mongoose');


//json解析
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}),function(req,res,next){

    console.log('步骤一');
    next();
});


//增加cookies模块
var Cookies=require('cookies');

//设置静态文件托管
app.use('/public', express.static(__dirname + '/public'),function(req,res,next){

                                                            console.log('步骤二');
                                                             next();
                                                        });
//定义当前应用所使用的模版引擎
//第一个参数：模版引擎名称，也是模版文件的后缀，第二个参数：表示处理模版的方法
app.engine('html',swig.renderFile);
//设置模版文件存放的目录,第一个参数必须是views,第二个参数：模版存放的路径
app.set('views','./views');
//注册使用模版引擎，第一个参数：view engine，第二个参数：必须和模版引擎的名称后缀相同
app.set('view engine','html');
//取消缓存
swig.setDefaults({cache:false});
// /**
//  * req:request对象
//  * res:response对象
//  * next：函数
//  *
//  *
//  * **/
// app.get('/',function (req,res,next) {
//    // res.send('欢迎光临，游客！');
//     /**
//      * 读取views目录下的指定文件，解析并返回给客户
//      * 第一个参数：views下的文件
//      * 第二个参数：数据
//      *
//      * **/
//     res.render('index');
// });
/**
 * 根据不同功能划分不同模块
 * **/
 app.use(function(req,res,next){
    req.cookies=new Cookies(req,res);
     req.userInfo={};
     console.log(req.cookies.get('userInfo'));
     if(req.cookies.get('userInfo')){
        req.userInfo=JSON.parse(req.cookies.get('userInfo'));
     }
     console.log('步骤八');
     next();
 });
app.use('/admin',require('./routers/admin'),function(req,res,next){

                                               console.log('步骤三');
                                                next();
                                           });
app.use('/api',require('./routers/api'),function(req,res,next){

                                           console.log('步骤四');
                                            next();
                                       });
app.use('/',require('./routers/main'),function(req,res,next){

                                         console.log('步骤五');
                                          next();
                                     });

//连接数据库
mongoose.connect('mongodb://localhost:27018/blog',function(err){
    if(err){
        console.log('数据库连接失败！');
    }else{
        console.log('数据库连接成功！');
        //监听http请求
        app.listen(8081);
    }
});

