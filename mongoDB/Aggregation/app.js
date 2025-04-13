const express = require('express');
const app = express();
const userModel = require('./models/user-model');
const postModel = require('./models/post-model');

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',function(req,res){
    res.send("This is the home page");
})




app.post('/create', async function(req,res){
    let user = await userModel.create({
        username : req.body.username,
        age : req.body.age,
        email : req.body.email,
        tags: req.body.tags,

    })
    res.send(user);
})


app.post('/:username/create/post',async function(req,res){
    let user = await userModel.findOne({username : req.params.username});

    let createdPost = await postModel.create({
        title : req.body.title,
        content : req.body.content,                    // post ke ander user ki id jaa chuki hai :
        author : user._id
    })

    user.posts.push(createdPost._id);   //  user ke annder post ki id jaa chuki hai
    await user.save();
    res.send({user,createdPost});    
})


// aggrigation ka mai kya hota hai ki isma hum ek hi data pr bhott sari conditions lgaa sakte hai:

// let see $match 
app.get('/testmatch', async function(req,res){
    let user = await userModel.aggregate([
        {$match : {age : 22}}
    ])
    res.send(user);
})

// $group :
app.get('/testgroup', async function(req,res){
    let users = await userModel.aggregate([
       {
        $group : {
            _id : "$age",       // mtlv ki age ke basis pe group kardo 
            data : {
                $push : "$$ROOT",      // ROOT user ka sara data show kar deta hai
            }
        }
       }
    ])

})

app.get('/testlookup',async function(req,res){
    let users = await postModel.aggregate([
        {
            $lookup: { 
                from : "users",  //data  kha se lekar aana  hai  
                localField : "author", // kiski value
                foreignField: "_id", // vo value kaha pr milagi
                as : "Author_Data"  // kis namm se show karun data ko 
            }
        }
    ])
    res.send(users);
})


app.get('/testproject',async function(req,res){
    let users = await userModel.aggregate([
        {
            $project : {
                username : 1,
                age : 1,
            }
        }
    ])
    res.send(users);
})


// app.get('/users',async function(req,res){
    // Saare users ke documents mein tags field add karna (agar missing ho)
    // await userModel.updateMany(
    //   { tags: { $exists: false } },  // jinke paas tags field nahi hai unko target karo
    //   { $set: { tags: [] } }         // unmein tags field as empty array set karo
    // );
    // await userModel.updateMany(
    //     {},
    //     { $push: { tags: { $each: ["learner", "js"] } } }
    //   );
      
//     res.send("done");

// })

app.get('/testunwind',async function(req,res){
    let users = await userModel.aggregate([
        {
            $unwind : "$tags" ,  // unwind array ke base pr divide kr deta hai same user ko like jitni array mai different values hongi utni bar data dikhayga same user ka but the differece is array ek ander ek ek value aaygi baki tumhe ye chalakar samjh mai aayga :
        }
    ])
    res.send(users);
})

// find all the posts whose author  is olly or oggy or any particular one :

app.get('/test',async function(req,res){
    let posts = await postModel.aggregate([
        {
            $lookup : {
                from : "users",
                localField : "author", // issa hum post ke ander jo author ki id hai use fill kar rhe hai with the actual data of the author :
                foreignField : "_id",
                as : "data",
            }
        }, 
        {
            $unwind: "$data" // data array ke form mai hai isi lia use deconstruct karna padaga tabhi hum niche vali qurey ko chala sakte hai (data.name) (dot operator works only on the objects) :
        },
        {
            $match : {
                "data.username" : "olly", // issa hum match kar rhe hai ki sirf wahi post dikhao jo ki olly ne hi likhi hon :
            }
        },
    ])
    res.send(posts);

})


    // Q2 => get a list of posts with the author's name and email included in the results :
    app.get('/question2',async function(req,res){
        let posts = await postModel.aggregate([
            {
                $lookup : {
                    from : "users",
                    localField : "author",
                    foreignField : "_id",
                    as : "data",
                }                                    // This series is known as aggrigation pipline 
            },
            {
                $unwind : "$data",
            },
            {
                $project : {
                    
                    title : 1,
                    content : 1,
                    "data.username" : 1,
                    "data.email" : 1,
                    "data._id" : 1
                }
            }

        ])
        res.send(posts);
    })



app.listen(3000);