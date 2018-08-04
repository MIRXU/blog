var express=require('express');
var router=express.Router();

var Categories=require('../models/Categories');

router.get('/',function (req,res,next) {
    Categories.find().then(function(categories){
        res.render('main/index',{
            userInfo:req.userInfo,
            categories:categories
        });
    })


});
module.exports=router;