var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
}).post('/autologin', function (req, res, next) {

  function findall() {

    var sql = "SELECT * FROM person";
    con.query(sql, function (err, docs, fields) {
      console.log("allrecords  " + JSON.stringify(docs));
      if (docs) {
      res.send(docs);} else {
    
        res.json({ name: 'first register first' });
      }
      if (err) {
        console.log("error connect DB" + err);}
      
     
    });
  }

  // console.log('approot'+req.body.user);treaba ymeni5 na posledn7 y
  con.connect(function (err) {
    var sql = "SELECT * FROM person  WHERE ip='" + req.ip + "' ORDER BY `TIMESTAMP` DESC";
    con.query(sql, function (err, docs, fields) {
      if (err) errorhandler(err);
      if (docs) {
       // console.log("Onerecords  "+docs.length + JSON.stringify(docs) );

        // console.log('username already taken');
      
let findOneSignout=-1;
for(let x=0; x<docs.length -1;x++){
  if (docs[x].signout ===1) {
     findOneSignout=x;
     x=docs.lenght; console .log("signout true autologin: " + JSON.stringify(docs[findOneSignout]));
  }
}

        if (findOneSignout !==-1) {
          res.send(docs[findOneSignout]);
        } else {
          findall();
        }
        //
      } else {

        findall();
        //

      }
    });
  });
}).get('/myimg', function (req, res, next) {
    
  
 
   var sql = "SELECT * FROM img WHERE ID="+(req.query.user_id) ;
   
    con.query(sql, function (err, docs, fields) {
    
      if (err) errorhandler(err);
      if (docs) {
      
        console.log("myimages: " + JSON.stringify(docs) );
        res.send(docs);
        //
      } else {
      res.redirect('back');
      }
    });
      
 
   
}).post('/allimg', function (req, res, next) {
  var sql = "SELECT * FROM img" ;
  con.query(sql, function (err, docs, fields) {
  //Person.findOne({ _id: JSON.parse(req.body.user_id) }, function (err, docs) {
    if (err) errorhandler(err);
    if (docs) {
      //  console.log('myPoll username already taken');
      //console.log("title: " + JSON.stringify(docs) + 'username already taken');
      res.send(docs);
      //
    } 
  });
    

}).post('/signout', function (req, res, next) {
//console.log(JSON.stringify(req.body));
  con.connect(function(err) {
    if (err) errorhandler(err);
    var sql = "UPDATE person SET signout = '"+req.body.signout+"' WHERE id = '"+JSON.parse(req.body.user_id)+"'";
    con.query(sql, function (err, result) {
      if (err) errorhandler(err) ;
      console.log(result.affectedRows + " record(s) signout updated"+req.body.signout);
    });
  });




}).get('/search', function (req, res, next) {



  let search = req.query.search;
 
  con.connect(function(err) {
    if (err) errorhandler(err);
       var sql = "SELECT * FROM person WHERE name='"+(search)+"'" ;console.log(sql);
    con.query(sql, function (err, docs, fields) {
    
      if (err) errorhandler(err);
      if (docs) {
      
        console.log("title: " + JSON.stringify(docs));
        res.redirect('/myimg?user_id='+docs[0].id);
        //
      } else {
      res.redirect('back');
      }
    });
        });
     /*  
      if (docs) {
        // 
        let newdoc=[];
  
        for (let x = 0; x < docs.length ; x++) {
                        
          for (let y = 0; y < docs[x].polls.length ; y++) {           
              
              let name = docs[x].polls[y].name; 
  
               if (name === search) {
                 
              newdoc.push( {mainId:docs[x]._id, subId:docs[x].polls[y]._id,name:docs[x].polls[y].name,comment:docs[x].polls[y].comment});
         
            }                  
          }
        }
  
   res.send(newdoc);
        //
      } else {
        res.status(404).send("no");
      }
    });*/
});


module.exports = router;
