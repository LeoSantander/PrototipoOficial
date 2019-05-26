var express =  require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

var con = mysql.createConnection({
    host:'sql136.main-hosting.eu',
    port:'3306',
    user:'u204053349_tg',
    password:'acesso?tg',
    database:'u204053349_tg'
});

var server = app.listen(4545, function(){
    var host = server.address().address
    var port = server.address().port
});

con.connect(function(error){
    if (error) console.log(error);
    else console.log("connected");
});