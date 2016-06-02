// console.log("in users js ");
var express = require('express');
var router = express.Router();
var service=require('./databb');






/* GET users listing. */
router.get('/', function(req, res) {
  console.log("in users router");
  // service.getAll();
  service.getAll(function(err,data){
    if(err) console.log(err);
    console.log(data);
    console.log("title-------------");
    console.log(data[0].title);
     res.json({msg:data});
  });
  // res.send('respond with a resource');
});

// router.get('/users', function(req, res, next) {
//   res.send('respond with a user resource');
// });
module.exports = router;
