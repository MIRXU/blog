var mongoose=require('mongoose');
//分类表结构
module.exports=new mongoose.Schema({
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categories'
    },
    title:string,
    content:string,
    desc:string
});