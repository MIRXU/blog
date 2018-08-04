var mongoose=require('mongoose');
var categorySchemas=require('../schemas/categories');
module.exports=mongoose.model('Categories',categorySchemas);