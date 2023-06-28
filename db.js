const dotenv=require('dotenv')
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
dotenv.config({path:"./config.env"})
const db=process.env.DATA
mongoose.connect(db,{
}
).then(()=>{
    console.log("Connected to databse...");
}).catch((e)=>{
    throw new Error(e)
})