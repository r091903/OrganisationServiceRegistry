var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var bookSchema=new Schema({
    title:String,
    author:String,
    category:String
});

// mongoose.connect('mongodb://localhost/test');
var books=mongoose.model('book',bookSchema,'book');
var service={};

service.getAll=function(callback){
  console.log("in get all ");
  return books.find({},callback);
}


// var service={};
//
// service.getAll=function(){
//
// }

module.exports=service;
