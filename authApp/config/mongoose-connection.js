const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to db");
    }
    catch(err){
        console.error("Mongodb connection error ", err);
        process.exit(1);  // ye line code ko yahi katham kr degi aage code nhi chalaga
    }
}

module.exports = connectDb;