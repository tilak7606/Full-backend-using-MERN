const express = require('express');
const app = express();


// request response :
// frontend (req) -> backend (res) -> frontend :

// app.get('/',function(req,res){
//     console.log(req.url);     
// })



// Dynamic routing in express js :

// app.get('/author/:username', function(req, res){
//     res.send(`The author is ${req.params.username}`)
// })

app.get('/author/:username/:age',function(req,res) {
    res.send(`Hey This is ${req.params.username} and my age is ${req.params.age}`) ;
})



app.listen(3000);