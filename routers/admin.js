var express=require('express');
var router=express.Router();

router.get('/user',function (req,res,next) {
    res.send('use');
});
module.exports=router;