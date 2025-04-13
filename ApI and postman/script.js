const express = require('express');
const app = express();

//requests 
// GET - server se kuch lana ho toh 
// POST - server par kuch change hoga , is aspect main ki kuch create hoga 
// PUT - update karne ke lia , poora content replace kar deta hai 
// PATCH - update karna ke lia poora replce nhi hota bss real content replace hota hai 


// app.get('/',function(req,res) {
//     res.send("Hello World");
// })

// app.put('/',function(req,res) {
//     res.send("Hello World");
// })
// app.post('/',function(req,res) {
//     res.send("Hello World");
// })
// // app.patch('/',function(req,res) {
//     res.send("Hello World");
// })
// app.delete('/',function(req,res) {
//     res.send("Hello World");
// })
// app.get('/profile' ,function(req,res) {
//     res.send("Tilak");
// })


// postman next vali module  hai :

// let data = [1,2,3,4,5];

// app.get('/',function(req,res) {
//     res.send("hello world");
// })

// app.get('/data',function(req,res) {
//     res.send(data);
// })

// app.get('/data/:number',function(req,res) {
//    data.push(parseInt(req.params.number));
//    res.send(data);
// })



// collections and variables  :

app.get('/hello/world/user/development',function(req,res){
    res.send('Hello World');
})
app.get('/hello/world/user/production/level',function(req,res){
    res.send('Production');
})


app.listen(3000);