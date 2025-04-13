const express =require('express');
const app = express();
const userModel = require('./models/user-model');
const postModel = require('./models/posts-model');

app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.get('/',function(req,res){
    res.send("hello kaise ho bhai");
})

app.post('/create', async function(req,res){
    let user = await userModel.create({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email

    })
    res.send(user);
})
// app.post('/:username/create/post', async function(req,res){
//     let user = await userModel.findOne({username : req.params.username});
//     user.posts.push({ content : "Hey this is my second post"}); // push command data ko temperary add karti hai agar permanent add karna hai toh .save() command chalani hogi ;
//     await user.save();
//     res.send(user);

// })

app.post('/:username/create/post',async function(req,res){
    let user = await userModel.findOne({username : req.params.username});

    let createdPost = await postModel.create({
        content : "Kuch bhi dall do",                    // post ke ander user ki id jaa chuki hai :
        user : user._id
    })

    user.posts.push(createdPost._id);   //  user ke annder post ki id jaa chuki hai
    await user.save();
    res.send({user,createdPost});
    
})



// Here we are reading data which is known as populating :

app.get('/posts',async function(req,res){
    const posts = await postModel.find().populate("user");
    res.send(posts);
})
app.get('/user',async function(req,res){
    const user = await userModel.find().populate("posts");
    res.send(user);
})


app.listen(3000,()=>console.log("app is running on the port 3000"));