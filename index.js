const express=require('express')
const cors=require('cors')
const app=express();
require('./db')
app.use(cors({}))
app.use(express.json())
app.use('/api/blog',require('./routes/blog'))

app.listen(5000,()=>{
    console.log('connected')
})