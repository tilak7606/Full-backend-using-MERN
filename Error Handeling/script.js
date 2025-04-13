const express = require('express');
const app = express();


app.get('/',function(req,res,next) {
    try{
    res.send("hey");

    }
    catch(err) {
        next(err)
    }
})






// error handler :
app.use((err,req,res,next) =>{
    // console.log(err)
    res.status(500).send(err.message);        // this flow is detected by the express intelligence if we want to try it by self we need to use try and catch 
})






app.listen(3000);