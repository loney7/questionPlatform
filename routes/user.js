const query = require('../database/queries')
const config = require("../database/config");

exports.login = async function(req, res){
    let db = await config();
   var message = '';
   var sess = req.session; 
 
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('index.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
   }         
};

exports.signup = async function(req, res){
    let db = await config();
    message = '';
    if(req.method == "POST"){
       var post  = req.body;
       var name= post.user_name;
       var pass= post.password;
       var fname= post.first_name;
       var lname= post.last_name;
 
       var sql = "INSERT INTO `users`(`first_name`,`last_name`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + name + "','" + pass + "')";
 
       db.query(sql, function(err, result) {
 
          message = "Succesfully! Your account has been created.";
          res.render('signup.ejs',{message: message});
       });
 
    } else {
       res.render('signup');
    }
 };