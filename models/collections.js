// to create Model
// to import mongoose
const mongoose=require('mongoose')

// then, define schema-fields and values of model(collection)
const usersSchema=new mongoose.Schema({
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
})



// create model
// model- collection name
const users=new mongoose.model("users",usersSchema)

// export model-to import in  another file
module.exports=users






