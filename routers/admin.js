var express=require('express');
var router=express.Router();

var User=require('../models/Users');


var Categories=require('../models/Categories');

router.get(function (req,res,next) {
   if(!req.userInfo.isAdmin){
      res.send('对不起，只有管理员才可以进入后台管理！');
   }
});
router.get('/',function (req,res,next) {
    res.render('admin/admin',{
        userInfo:req.userInfo
    });
});
router.get('/user',function (req,res,next) {
    var page=req.query.page||1;
    var limit=2;

    var pages=0;
    User.count().then(function(count){

        pages=Math.ceil(count/limit);
        page=Math.min(page,pages);
        page=Math.max(page,1);
        var skip=(page-1)*limit;
        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user_index',{
                userInfo:req.userInfo,
                users:users,
                count:count,
                pages:pages,
                limit:limit,
                page:page
            });
        });

    });
});
router.get('/category',function (req,res,next) {
    var page=req.query.page||1;
    var limit=2;

    var pages=0;
    Categories.count().then(function(count){

        pages=Math.ceil(count/limit);
        page=Math.min(page,pages);
        page=Math.max(page,1);
        var skip=(page-1)*limit;
        Categories.find().limit(limit).skip(skip).then(function (categories) {
            res.render('admin/category_index',{
                userInfo:req.userInfo,
                categories:categories,
                count:count,
                pages:pages,
                limit:limit,
                page:page
            });
        });

    });
});
router.get('/category/add',function (req,res,next) {
    res.render('admin/categoryadd_index',{
        userInfo:req.userInfo
    });
});
router.post('/category/add',function (req,res,next) {
   var name= req.body.name||''
    if(name==''){
       res.render('admin/error',{
           userInfo:req.userInfo,
           message:'名称不能为空'
       });
       return;
    }
    Categories.findOne({
        name:name
    }).then(function(rs){
       if(rs){
           res.render('admin/error',{
               userInfo:req.userInfo,
               message:'该名称已经存在'
           });
           return Promise.reject();
       }else{
           return new Categories({
               name:name
           }).save();
       }
    }).then(function(newCategory){
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'保存分类成功',
            url:'/admin/category'
        });
    });
});
router.get('/category/update',function(req,res){
    var id=req.query.id||''
    Categories.findOne({
        _id:id
    }).then(function(category){
        if(!category){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'该用户不存在'
            });
            return Promise.reject();
        }else {
            if (category) {
                res.render('admin/update', {
                    userInfo: req.userInfo,
                    category: category
                });
            }
        }
    });
});
router.post('/category/update',function(req,res){
    var id=req.query.id||''
    var name=req.body.name||''
    console.log("========="+id);
    Categories.findOne({
        _id:id
    }).then(function(category){
        if(!category){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'该用户不存在'
            });
            return Promise.reject();
        }else {
            if (name==category.name) {
                res.render('admin/success',{
                    userInfo:req.userInfo,
                    message:'修改成功',
                    url:'/admin/category'
                });
                return Promise.reject();
            }else{
                return Categories.findOne({
                    _id: {$ne:id},
                    name:name
                })
            }
        }
    }).then(function(sameCategory){
        if(sameCategory){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'已经存在同名分类'
            });
            return Promise.reject();
        }else{
           return Categories.update({
                _id:id
            },{
                name:name
            })
        }
    }).then(function(){
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'修改成功',
            url:'/admin/category'
        });
    });
});
router.get('/category/delete',function(req,res){
    var id=req.query.id||'';
    Categories.remove({
        _id:id
    },function(){
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'删除成功',
            url:'/admin/category'
        });
    })
});
module.exports=router;