const express = require('express');
const app = express();
const mongooseconnection = require('./config/mongoose')
const userModel = require('./models/user')

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get('/',function(req,res){
    res.send("Hello World");
})

// app.get('/create',async function(req,res){ // user create karne ke lia 
//     let createdUser = await userModel.create({
//         username : "Tilak",
//         name :"Tilak",
//         email : "tilak@gmail.com",
//         password: "pass"
//     })
//     // console.log("user created");
//     res.send(createdUser);
// })

// app.get('/read',async function(req,res){    //user read karne ke lia 
//     let user = await userModel.findOne({name:"Tilak"}); // findOne sirf ek user ko find karke deta hai agar sare user chahiye toh sirf findOne ki jagha find likhana hoga :
//     console.log("readed");

//     res.send(user);
// })

// app.get('/update',async function(req,res){
//     let user = await userModel.findOneAndUpdate({name:"Tilak Saini"}, {name : "Tilak"}, {new : true})  // new true mtlv ki new vala show karo 
    
//     res.send(user)
// })
// app.get('/delete',async function(req,res){
//     let user = await userModel.findOneAndDelete({name:"Tilak"});
   
//     res.send(user)
// })

app.post('/create',async function(req,res,next){
    const {name , password, username, email} = req.body;
    let createdUser = await userModel.create({
        name, 
        password,
        email,
        username
    })
    res.send(createdUser);
})

app.get('/users' , async function(req,res){
    let users = await userModel.find();
    res.send(users)
})

app.get('/user/:username',async function(req,res) {
    let user = await userModel.findOne({username : req.params.username});
    res.send(user);
})
app.get('/update/:username',async function(req,res) {
    const {name , password, username, email} = req.body;

    let user = await userModel.findOneAndUpdate({username : req.params.username},{name,username,password,email},{new : true});
    res.send(user);
})

app.get('/delete/:username',async function(req,res){
    let user = await userModel.findOneAndDelete({username: req.params.username});
    res.send(user);
})


app.listen(3000 , () => console.log('running on port 3000'));