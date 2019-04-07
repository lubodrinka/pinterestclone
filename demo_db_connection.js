var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"pinterestDB"
});

con.connect(function(err) {
  if (err) {
    console.log("error connect DB"+err);}
    else{
        console.log("Connected!");
    }
    
});