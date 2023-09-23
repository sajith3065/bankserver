const mongoose=require('mongoose')

mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("MDB Connected");
}).catch(()=>{
    console.log("MDB Not Connected");
})