const express = require('express');
const app = express();
const db = require('./config/mongoose-connection')
const config =require('config');

require('dotenv').config();
// console.log(process.env.KEY);
const indexRouter = require('./routes/index-router')
const userRouter = require('./routes/user-router')

app.use('/',indexRouter);
app.use('/user',userRouter);



// app.listen(process.env.PORT || 3000) 
app.listen(config.get("PORT"));
