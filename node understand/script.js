const fs = require('fs');

// fs.writeFile("someData.txt","Hey this is Tilak",function(err) {
//     if(err) console.log(err);
//     else
//     console.log("File Created..");                                        // for writing in file :
// })

 
// fs.readFile("abc.txt","utf8", function(err,data) {
//     if(err) console.log(err);                                             // reading file :
//     else console.log(data)
// })   


    // fs.appendFile("abc.txt"," appended data" ,function(err) {
    //     if(err) console.log(err);                                          // append karna file ko :
    //     else console.log("data appended")
    // })


    // fs.rename("abc.txt","hey.txt",function(err) {
    //     if(err) console.log(err);                                              // file ko rename karna :
    //     else console.log("file renamed")
    // })


    // fs.unlink("someData.txt",function(err){
    //     if(err) console.log(err) ;                                           // file ko delete karna :
    //     else console.log("deleted")
    // })


    // fs.mkdir("lolo",function(err) {
    //     if(err) console.log(err);                                             // folder create karna  :
    //     else console.log("created ");
    // })


    // fs.readdir("lolo",{withFileTypes: true},function(err,files) {
    //     if(err) console.log(err);                                               // folder read karna :
    //     else console.log(files)
    // })


    // fs.rm("faltu", {recursive : true},function(err){                              // deleting a folder 
    //     if(err) console.log(err);
    //     else console.log("Folder deleted ");
    // })


    // sync functions :
    // fs.writeFileSync("hey.txt","who are you ");                // sync functions ka nature blocking hota hai iska mtlv hai ki jab tk ye kudh execute nhi ho jate tb tk ye aage vale code ko execute nhi hone denge ;

    // const data = fs.readFileSync("hey.txt","utf8");
    // console.log(data)





//                                             here we start with http :


    // const http = require('http');

    // const server = http.createServer(function(req,res) {
    //     res.end("Hello world  ");
    // })
 

    // server.listen(3000)


    // const http = require('http');
    
    // const server = http.createServer(function(req,res) {
    //     console.log(req.url)                                          // This is how we use req.url 
    //     if(req.url === '/')
    //         res.end("Hey World")
    //     else 
    //         res.end("Page not Found")
    // })


    // server.listen(3000);



    //                                                            express starts from here :


    // const express = require('express')
    // const app = express()

    // app.get('/', function (req, res) {
    // res.send('Hello World')
    // })

    // app.listen(3000)

    const express = require('express');
    const app = express();

    // app.use(function(req,res,next){                   // these are known as middlewares when any route is send from client to server then it goes through middlewares // jisme req, res , next tino ho vahi middleware hai :
    //     console.log("hey Hello");
    //     next();
    // })

    // app.use(function(req,res,next){
    //     console.log("hey hello kaise ho");
    //     next();
    // })

    // app.get('/' , function(req,res){
    //     res.send("Hello Tilak");
    // })

    // app.get('*',function(req,res){
    //     res.send("If nothing works, I will work");                       // * is a universal route which matches to all the route and it is also made in bottom :
    // })

    const expressSession = require('express-session')  // iske lia npm se express session package download karna pdaga and the command is : npm i express-session
    const flash = require('connect-flash');
    const cors = require('cors'); // cors stands for cross-origin-resource-sharing . Install krna ke lia command hai npm i cors :
    

    app.use(cors());          // abb koi dusra domain hmare domain se data access kar sakta hai :

    app.use(expressSession ({
        secret: "random stuff", // iske base pr session encript hota hai it must be uniqe
        resave : false, // means user ne kuch bhi new nhi kara hai fir bhi hm use resave krna chahte hai ya nhi flase se mtlv hai nhi 
        saveUninitialized : false, // mtlv koi new user aaya hai aur uske bina login kia hua hm koi bhi blank session nhi bnana chahte hai :     
    }) )
    
    app.use(flash())
    
    app.get('/',function(req,res) {
        req.flash("error","Invalid Credentials");
        res.redirect('/error');
    })

    app.get('/error',function(req,res){
        let message = req.flash("error");
        res.send(message)
    })



    // app.get('/create',function(req,res,next){
    //     req.session.polo = true;
    //     res.send("done");                              // express session ka part hai :
    // })
    // app.get('/check',function(req,res,next){
    //  console.log(req.session.polo)
    //  res.send("check")
    // })



    // cookie parser 
    const cookieParser = require('cookie-parser');   // cookie parser is middleware that helps your server read cookies sent by the browser.
    app.use(cookieParser());


    // morgan 
    // const morgan = require('morgan');
    // app.use(morgan("combined"))

    app.get('/check',function(req,res,next){
        console.log(req.cookies.name);
        res.send("Checked ");
    }) 

   


    app.get('/banned',function(req,res) {
        res.cookie("name","Tilak");      // cookie save karna browser par name nam ki cookie hai jiski value Tilak Hai :
        res.send("banned");
    })










    app.listen(3000);