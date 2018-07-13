var mongoose=require('mongoose');
var userSchemas=require('../schemas/users');
module.exports=mongoose.model('User',userSchemas);