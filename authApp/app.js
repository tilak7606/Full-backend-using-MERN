const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const connectToDB = require('./config/mongoose-connection');
connectToDB(); // database ka function 

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.get('/',function(req,res){
    res.send("Hello world");
})

app.use('/api/auth',authRoutes);


app.listen(3000);