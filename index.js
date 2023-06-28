const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const app=express();
dotenv.config({path:"./config.env"})
require('./db')
const PORT=process.env.PORT
app.use(cors({}))
app.use(express.json())
app.use('/api/blog',require('./routes/blog'))

app.listen(PORT,()=>{
    console.log('connected')
})