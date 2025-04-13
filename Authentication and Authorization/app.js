// jb hum server pr koi request bhajte hai toh server humse puchta hai ki hum kon hai aur jb vo confirm kar leta hai ki banda original hai toh vo hma reply karta hai aur sath hi mai ek token bhi de deta hai jo ki hamare browser pr save ho jata hai aur fir jab  hum next time sever pr request bhajte hai toh vo token bhi sath mai jata hai issa server ko pata chal jata hai ki same hi banda hai isa authorization de do.

// bcrypt
// jwt
// cookie-parser

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/',function(req,res){
    res.send("hey");
})

app.get('/bcrypt',async function(req,res){
    let salt = await bcrypt.genSalt(10);
    let encrypt = await bcrypt.hash("originalPassword",salt);
    res.send(encrypt);
})
app.get('/checkPassword',async function(req,res){
    let result = await bcrypt.compare(
        "originalPassword",
        "$2b$10$wFF5lTrR8mDBXoibjQquZuEy0tTSW1uVJs/.eKa20Lth0O17sBF7K"
    );
    res.send(result);
})
app.get('/tokenMaker',function(req,res){
    let token = jwt.sign({email : "Tilak@gmail.com"}, "secret_KEY");
    res.send(token);
})
app.get('/tokenData',function(req,res){
    let data = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlRpbGFrQGdtYWlsLmNvbSIsImlhdCI6MTc0NDQzNTAwN30.SxSkinzhjK4oAJdxcdqCFbY9PYlTUIN2GdTXVVXsO2o", "secret_KEY");
    res.send(data);
})

app.get('/setcookie',function(req,res){
    res.cookie("age","20",{
        // maxAge : 10000,  // 1sec = 1000 ms ,
        httpOnly : true,
    });
    res.send("cookie set ho gayi hai");
})

app.get('/readcookie',function(req,res){
    res.send(req.cookies.age);
})
app.listen(3000);
