var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });




app.post('/newimg', urlencodedParser, function (req, res, next) {

  

    let urlImg = req.body.urlimg;

    let comment = req.body.comment;

    let User_id = req.body.User_id != 'unregistered' ? JSON.parse(req.body.User_id) : req.body.User_id;
    // res.json({ working: (req.body) });
    //find one name and then add create name to 

    con.connect(function (err) {
        if (err) errorhandler(err);
        console.log("Connected!" + con.config.database);
        /*var sqlTable = "CREATE TABLE img (ID/img int not null auto_increment primary key, comment VARCHAR(255), imgUrl VARCHAR(255) not null, " +
            "ID/p int,    PRIMARY KEY (ID/img), FOREIGN KEY (ID/p) REFERENCES person(ID/p))ENGINE=InnoDB;";
            console.log(sqlTable);
        con.query(sqlTable, function (err, result) {
            if (err) errorhandler(err);
            console.log("Table created"+result);
        });*/

        var sqldb = "SELECT * FROM person WHERE id=" + User_id;
        con.query(sqldb, function (err, docs, fields) {
            var sql = 'INSERT INTO img set ?';
            var dataObj = { imgUrl: urlImg, comment: comment, "ID": User_id, name: docs[0].name };

            con.query(sql, dataObj, function (err, result) {
                if (err) errorhandler(err);
                console.log("1 record inserted " + result);
                res.redirect('back');
            });
        });
    });


 

}).get('/delete/:imgid', function (req, res, next) {



    let imgID = req.params.imgid;


    if (imgID != "") {
        con.connect(function (err) {
            if (err) errorhandler(err);
            var sql = "DELETE FROM `img` WHERE `ID/img` = " + imgID ;
            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) errorhandler(err);

                res.format({
                    html: function () {
                        res.send('<link href="/stylesheets/style.css" rel="stylesheet"></link>' +
                            '<body onload="load()" > <div    id="deleteMsg" ><h2>' + result + ', the image ' +
                            ' was succesfully removed       <a  href="/">Home</a></h2></div></body>' +
                            '<script ">' +
                            'function load() {' +
                            ' setTimeout( function (){' +
                            'window.location.href="/"   ;},1000);' +
                            '}' +
                            '</script>');
                    }
                });
            });

        });

    } else {
        res.redirect("/");
    }

});
module.exports = router;