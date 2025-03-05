var express = require('express');
var app = express();
var mysql2 = require("mysql2");

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.listen(3000, function() {
    console.log('server started');
});

app.get('/', function(req, resp) {
    let path = __dirname+ "/public/index.html";
    resp.sendFile(path);
});

let config = "mysql://avnadmin:AVNS_1OfzFkin3gdRa0RKuVx@playtour-playtour.c.aivencloud.com:12731/eventsphere";

let mySqlServer = mysql2.createConnection(config);
mySqlServer.connect(function(err) {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + mySqlServer.threadId);
});


app.get("/signup", function(req, resp) {
    let email = req.query.txtEmail;
    let password = req.query.txtPwd;
    let userType = req.query.userType;

    
    mySqlServer.query("INSERT INTO users(email,pwd,user_type) VALUES(?,?,?)", [email, password, userType], function(err, jsonArray){
        if(err){
            resp.send("Error: " + err.message);
        }else{
            resp.send("User created successfully");
        }
    });

    
});

app.get("/login",function(req,resp){
    let email = req.query.txtEmail;
    let password = req.query.txtPwd;

    mySqlServer.query("SELECT * FROM users WHERE email=?", [email], function(err, jsonArray){
        if (jsonArray.length >0) {
            let existingPassword = jsonArray[0].pwd;
            let user = jsonArray[0].user_type;

            if (existingPassword === password) {
                resp.send(user);
            }
            else {
                resp.send("Invalid Password");
            }
        }
        else {
            resp.send("User doesn't exist");
        }
    });
})

app.get("/checkUser", function (req, resp) {
    let email = req.query.txtEmail;
    mySqlServer.query("select * from users where email=?", [email], function (err, jsonArray) {
        if (err != null) {
            resp.send(err.message);
        }
        if (jsonArray.length == 1) {
            resp.send("Already Taken!!!");
        }
        if (jsonArray.length == 0) {
            resp.send("Not");
        }
    })
})