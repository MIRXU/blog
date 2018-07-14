var express=require('express');
var router=express.Router();
var User=require('../models/Users');
var resposeData;
router.use(function(req,res,next){
   resposeData={
      code:0,
      message:''
   }
   next();
});
router.post('/user/register',function (req,res,next) {
   var username=req.body.username;
   var password=req.body.password;
   var password1=req.body.password1;
   //判断用户是否为空
    if(username==''){
       resposeData.code=1;
       resposeData.message='用户名不能为空';
        res.json(resposeData);
       return;
    }
    //判断密码是否为空
    if(password==''){
        resposeData.code=2;
        resposeData.message='密码不能为空';
        res.json(resposeData);
        return;
    }
    if(password != password1){
        resposeData.code=3;
        resposeData.message='两次密码不一致';
        res.json(resposeData);
        return;
    }
    User.findOne({
        username:username
    }).then(function(userinfo){
        if(userinfo){
            resposeData.code=4;
            resposeData.message='用户已经存在';
            res.json(resposeData);
            return;
        }
        var user=new User({
            username:username,
            password:password
        });
        return user.save();
    }).then(function(newUserinfo){
        console.log(newUserinfo)
        resposeData.message='注册成功'
        res.json(resposeData);
    });

});
router.post('/user/login',function(req,res,next){
    var username=req.body.username;
    var password=req.body.password;
    if(username==''||password==''){
        resposeData.code=4;
        resposeData.message='用户名或者密码不能为空';
        res.json(resposeData);
        return;
    }
    User.findOne({
        username:username,
        password:password
    }).then(function(userinfo){
        if(!userinfo){
            resposeData.code=1;
            resposeData.message='或者密码错误';
            res.json(resposeData);
            return;
        }
        resposeData.message='登陆成功';
        resposeData.userinfo= {
            _id: userinfo._id,
            username: userinfo.username
        }
        res.json(resposeData);
    });
});
module.exports=router;