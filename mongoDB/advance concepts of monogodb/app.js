const express = require('express');
const app = express();
const userModel = require('./models/user');



const dummyData = [
    {
        username: "tilak123",
        name: "Tilak Sharma",
        password: "password123",
        age: "22",
        isMarried: false,
        email: "tilak@123.com"
    },
    {
        username: "rahul_dev",
        name: "Rahul Dev",
        password: "rahul@dev",
        age: "25",
        isMarried: true,
        email: "rahul@devmail.com"
    },
    {
        username: "priya_99",
        name: "Priya Singh",
        password: "priya#99",
        age: "21",
        isMarried: false,
        email: "priya.singh@email.com"
    },
    {
        username: "aman_kumar",
        name: "Aman Kumar",
        password: "aman!pass",
        age: "24",
        isMarried: true,
        email: "aman.kumar@email.com"
    },
    {
        username: "neha_rocks",
        name: "Neha Verma",
        password: "neha@123",
        age: "23",
        isMarried: false,
        email: "neha.verma@email.com"
    },
    {
        username: "vikas_tiwari",
        name: "Vikas Tiwari",
        password: "vikas@456",
        age: "26",
        isMarried: true,
        email: "vikas.tiwari@email.com"
    },
    {
        username: "shweta_mehta",
        name: "Shweta Mehta",
        password: "shweta@pass",
        age: "22",
        isMarried: false,
        email: "shweta.mehta@email.com"
    },
    {
        username: "rohit_123",
        name: "Rohit Sharma",
        password: "rohit!789",
        age: "27",
        isMarried: true,
        email: "rohit.sharma@email.com"
    },
    {
        username: "anita_das",
        name: "Anita Das",
        password: "anita@321",
        age: "24",
        isMarried: false,
        email: "anita.das@email.com"
    },
    {
        username: "sandeep_gupta",
        name: "Sandeep Gupta",
        password: "sandeep@pass",
        age: "28",
        isMarried: true,
        email: "sandeep.gupta@email.com"
    },
    {
        username: "kiran_raj",
        name: "Kiran Raj",
        password: "kiran@987",
        age: "23",
        isMarried: false,
        email: "kiran.raj@email.com"
    },
    {
        username: "deepak_yadav",
        name: "Deepak Yadav",
        password: "deepak@741",
        age: "29",
        isMarried: true,
        email: "deepak.yadav@email.com"
    },
    {
        username: "megha_patel",
        name: "Megha Patel",
        password: "megha@pass",
        age: "25",
        isMarried: false,
        email: "megha.patel@email.com"
    },
    {
        username: "arjun_singh",
        name: "Arjun Singh",
        password: "arjun@963",
        age: "26",
        isMarried: true,
        email: "arjun.singh@email.com"
    },
    {
        username: "sonali_chopra",
        name: "Sonali Chopra",
        password: "sonali@pass",
        age: "24",
        isMarried: false,
        email: "sonali.chopra@email.com"
    }
];





app.get('/',function(req,res){
    res.send("hello world");
})
app.get('/createmany',async function(req,res){
   let users = await userModel.insertMany(dummyData);
    res.send(users)
})

app.get('/users',async function(req,res) { 
    let users = await userModel.find({age : {$eq : 22}}); // eq ka mtlv hai equal to :
    res.send(users)
})
app.get('/usersNot',async function(req,res) { 
    let users = await userModel.find({age : {$ne : 22}}); // ne ka mtlv hai not-equal to :
    res.send(users)
})
app.get('/lessthan',async function(req,res) { 
    let users = await userModel.find({age : {$lt : 23} }); //lt ka mtlv hai less than
    res.send(users)
})
app.get('/lessthanequal',async function(req,res) { 
    let users = await userModel.find({age : {$lte : 25} }); //lt ka mtlv hai less than equal to
    res.send(users)
})

app.get('/greaterthan',async function(req,res) { 
    let users = await userModel.find({age : {$gt : 25} }); //gt ka mtlv hai greater than
    res.send(users)
})
app.get('/greaterthanequal',async function(req,res) { 
    let users = await userModel.find({age : {$gte : 27} }); // gte ka mtlv hai greater than equals to 
    res.send(users)
})

app.get('/incommand',async function(req,res) { 
    let users = await userModel.find({age : {$in : [22]} }); //in ka mtlv hai ki in mai se jo jo hai vo dikhao (jo values array mai sirf usse ke users aayange )
    res.send(users)
})

app.get('/notin', async function(req,res){
    // let users = await userModel.find({age : {$nin : [22,25,27,26,24]}})
    let users = await userModel.find({isMarried : {$nin : [true]}})       // nin ka not in mtlv ki vlaues ko choodd kar jo values hai unhe dikha do 
    res.send(users);
})

app.get('/exist' , async function(req,res){
    let users = await userModel.find({isAdmin : {$exists : false}});  // exists ka mtlv hai ki hum kisi user ko dhundna chahte hai with the help of a fild which  exist in user schema 
    res.send(users);
})

app.get('/andoperator',async function(req,res){
    let users = await userModel.find({$and : [{isMarried : false},{age : {$gte : 20}}]}); // isme ek toh married status false ho aur age greater than and equal to ho 20 ke ho :
    res.send(users); 
})
app.get('/oroperator',async function(req,res){
    let users = await userModel.find({$or : [{isMarried : false},{age : {$gte : 27}}]}); // isme ya toh married status false ho aur ya toh age greater than and equal to ho 20 ke ho aur ya toh dono ho :
    res.send(users); 
})






// regular expressions (Regex) :
// starts with - ^
// ends with - $
// in middle ke lia - .*
// let say a name Tilak which starts with T then we have to write it as - ^T

app.get('/regularExpression',async function(req,res){
    // let users = await userModel.find({name : {$regex : /^T.*a$/i }});
   let users = await userModel.find({name : {$regex : /^P.*h$/i }});             // here i means that upper case and lower case are equal 
    res.send(users);
})











app.listen(3000)